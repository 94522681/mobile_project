<template>
    <div class="comment">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.aut_name">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate|relativeTime}}</span>
            <van-button size="mini" type="default" @click="showthepop(item)">回复</van-button>
          </p>
        </div>
        <van-button
        slot="right-icon"
          :class="['like-btn',item.is_liking?'red':'']"
          :icon="item.is_liking? 'good-job':'good-job-o'"
          @click="tolikeIt(item.com_id,item)"
        >{{ item.like_count || '赞' }}</van-button>
      </van-cell>
    </van-list>
    <van-popup v-model="isReplyShow" position="bottom" style="height:100%" >
      <van-nav-bar
      title="2条回复"
      left-text="返回"
      left-arrow
      @click-left="isReplyShow=false"
    />
    <van-cell >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="theChoseComment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{theChoseComment.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{theChoseComment.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{theChoseComment.pubdate|relativeTime}}</span>
            <van-button size="mini" type="default" @click="showtheReplypop(theChoseComment)">回复</van-button>
          </p>
        </div>
        <van-button
        slot="right-icon"
          :class="['like-btn',theChoseComment.is_liking?'red':'']"
          :icon="theChoseComment.is_liking? 'good-job':'good-job-o'"
          @click="tolikeIt(theChoseComment.com_id,theChoseComment)"
        >{{ theChoseComment.like_count || '赞' }}</van-button>
      </van-cell>
      <van-cell-group title="全部评论">
          <van-list
          v-model="replyLoading"
          :finished="replyFinished"
          finished-text="没有更多了"
          @load="onReplyLoad"
          >
      <van-cell v-for="(item,index) in theReplyList" :key="index" :title="item.aut_name">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate|relativeTime}}</span>
            <van-button size="mini" type="default" >回复</van-button>
          </p>
        </div>
        <van-button
        slot="right-icon"
          :class="['like-btn',item.is_liking?'red':'']"
          :icon="item.is_liking? 'good-job':'good-job-o'"
          @click="tolikeIt(item.com_id,item)"
        >{{ item.like_count || '赞' }}</van-button>
      </van-cell>
    </van-list>
      </van-cell-group>
      <van-popup v-model="popShow" position="bottom" :style="{ height: '120px' }"  class="theCommentPop" >
          <van-field
            v-focus
            v-model="inputMessagePop"
            rows="3"
            autosize
            type="textarea"
            placeholder="请输入评论"
            maxlength="50"
            show-word-limit
          />
        <van-button @click="toAddComment('level2')" >发布</van-button>
      </van-popup>
    </van-popup>
    </div>
</template>

<script>
import { getPassageComment, likeComment, deleteComment, addComment } from '@/api/comment.js'
export default {
  props: {
    source: {
      type: [String, Object, Number],
      required: true
    }
  },
  data () {
    return {
      replyFinished: false,
      replyLoading: false,
      popShow: false,
      inputMessagePop: '',
      isReplyShow: false,
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      theChoseComment: {},
      theCommentId: undefined,
      theReplyList: [],
      replyOffset: null
    }
  },
  methods: {
    async tolikeIt (comid, item) {
      if (item.is_liking) {
        try {
          await deleteComment(comid + '')
          item.is_liking = false
        } catch (e) {
          console.log(e)
        }
      } else {
        try {
          await likeComment({ target: comid + '' })
          item.is_liking = true
        } catch (e) {
          console.log(e)
        }
      }
    },
    async onReplyLoad () {
      var params = {
        type: 'c',
        source: this.theCommentId + '',
        offset: this.replyOffset,
        limit: this.limit
      }
      console.log(params)
      try {
        const { data: res } = await getPassageComment(params)
        this.theReplyList.push(...res.data.results)
        console.log(res)
        this.replyLoading = false
        if (res.data.results.length) {
          this.replyOffset = res.data.last_id
        } else {
          this.replyFinished = true
        }
      } catch (e) {
        console.log(e)
        this.replyLoading = false
      }
    },
    async  onLoad () {
      var params = {
        type: 'a',
        source: this.source + '',
        offset: this.offset,
        limit: this.limit
      }
      console.log(params)
      try {
        const { data: res } = await getPassageComment(params)
        this.loading = false
        this.list.push(...res.data.results)
        console.log(res.data.results)
        this.$emit('commontCount', res.data.total_count)
        if (res.data.results.length) {
          this.offset = res.data.last_id
        } else {
          this.finished = true
        }
      } catch (e) {
        console.log(e)
        this.loading = false
      }
      this.loading = false
    },
    showthepop (item) {
      this.isReplyShow = true
      // 准备回复的是哪一条评论
      this.theChoseComment = item
      // 拿到这条评论的回复
      console.log(1)
      this.theCommentId = item.com_id
      console.log(item.com_id)
    },
    async getReplyList () {
      try {
        const { data: res } = await getPassageComment({

        })
        console.log(res)
      } catch (e) {

      }
    },
    async toAddComment (str) {
      try {
        const { data: res } = await addComment({
          target: this.theCommentId,
          content: this.inputMessagePop,
          art_id: this.source + ''
        })
        this.$toast.success('评论成功')
        this.popShow = false
        this.theReplyList.unshift(res.data.new_obj)
        this.inputMessagePop = ''
      } catch (e) {
        console.log(e)
      }
    },
    showtheReplypop (item) {
      this.popShow = true
      this.theCommentId = item.com_id
    }
  },
  directives: {
    focus: {
      inserted (el) {
        const t = el.querySelector('textarea')
        t.focus()
      }
    }
  }
}
</script>
<style scoped lang="less">
.comment{
  width: 100%;
  .van-list {
    margin-bottom: 45px;
  .red{
    color: #e5645f;
  }
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
