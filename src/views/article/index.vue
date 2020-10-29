<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="潇湘头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="!data">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{data.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="data.aut_photo"
          />
          <div slot="title" class="user-name">{{data.aut_name}}</div>
          <div slot="label" class="publish-date">{{data.pubdate|relativeTime}}</div>
          <van-button
          v-if="!data.is_followed"
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="toFollow"
          >关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            round
            size="small"
            @click="deleteFollow"
          >已关注</van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="data.content" ref='thecontent'></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-if="!data">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-if="!data">
        <van-icon name="failure" />
        <p class="text" >内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        info="123"
        color="#777"
      />
      <van-icon
        :color="data.is_collected? '#ffa500':'#777'"
        :name="data.is_collected? 'star':  'star-o'"
        @click="collectIt"
      />
      <van-icon
        :color="data.attitude===1? '#e5645f': '#777'"
        :name="data.attitude===1? 'good-job':'good-job-o'"
        @click="likeIt"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>
<script>
import { getPassageById } from '@/api/passage'
import './markdown.css'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow, collectPassage, deleteCollect, toLikeIt, deleteLikeIt } from '@/api/user.js'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    window.vue = this
    // this.imgPreview()
  },
  // list为空的原因应该数据驱动视图,还没有渲染完毕,所以拿到的dom结点里面没有任何东西
  methods: {
    async getPassageContent () {
      try {
        const { data: res } = await getPassageById(this.articleId)
        this.data = res.data
        // 为图片自注册点击事件
        setTimeout(this.imgPreview, 0)
        console.log(this.data)
      } catch (err) {
        console.log(err)
      }
    },
    onClickLeft () {
      this.$router.back()
    },
    imgPreview () {
      const passageContent = this.$refs.thecontent
      // console.log(passageContent)
      const imgs = passageContent.querySelectorAll('img')
      const imgUrls = []
      imgs.forEach((item, index) => {
        imgUrls.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images: imgUrls,
            closeable: true,
            index
          })
        }
      })
    },
    async toFollow () {
      if (!this.$store.state.user) {
        return this.$toast('请先登录哦')
      }
      try {
        await addFollow(this.data.aut_id)
        this.data.is_followed = true
      } catch (err) {
        console.log(err)
      }
    },
    async deleteFollow () {
      try {
        await deleteFollow(this.data.aut_id)
        this.data.is_followed = false
        console.log(1)
      } catch (err) {
        console.log(err)
      }
    },
    async collectIt () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      if (!this.$store.state.user) {
        return this.$toast('请先登录哦')
      }
      if (this.data.is_collected) {
        try {
          await deleteCollect(this.data.art_id)
          this.$toast.success('取消收藏成功')
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          // debugger
          await collectPassage(this.data.art_id)
          this.$toast.success('收藏成功')
        } catch (err) {
          console.log(err)
        }
      }
      this.data.is_collected = !this.data.is_collected
    },
    async likeIt () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      if (!this.$store.state.user) {
        return this.$toast('请先登录哦')
      }
      if (this.data.attitude === 1) {
        try {
          await deleteLikeIt(this.data.art_id)
          this.$toast.success('取消收藏成功')
          this.data.attitude = 0
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          const a = await toLikeIt(this.data.art_id)
          console.log(a)
          this.$toast.success('收藏成功')
          this.data.attitude = 1
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  created () {
    this.getPassageContent()
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}

</style>
