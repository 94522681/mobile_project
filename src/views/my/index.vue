<template>
  <div class="container">
    <div class="header" v-if="!$store.state.user">
      <img src="~@/assets/mobile.png" @click="$router.push('/login')" class="mobile-img">
    <span>点击登录</span>
    </div>
    <div class=" user-info" v-else-if="$store.state.user">
      <div class="base-info">
        <div class="left">
        <van-image
        class="avatar"
        round
        fit="cover"
        :src="userList.photo"
      />
      <span>{{userList.name}}</span></div>
      <div class="right">
        <van-button size="mini" round>编辑资料</van-button>
      </div>
      </div>
      <div class="data-status">
        <div class="data-item">
          <div class="count">{{userList.follow_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{userList.fans_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{userList.like_count}}</div>
          <div class="text">获赞</div>
        </div>
        <div class="data-item">
          <div class="count">{{userList.art_count}}</div>
          <div class="text">动态</div>
        </div>
      </div>
    </div>
            <van-grid  :column-num="3" border class="grid-nav">
                <van-grid-item  class="grid-item">
                  <i class="iconfont  iconshoucang" slot="icon" ></i>
                  <span slot="text">收藏</span>
                </van-grid-item>
                <van-grid-item  class="grid-item">
                  <i class="iconfont  iconlishi" slot="icon" ></i>
                  <span slot="text">历史</span>
                </van-grid-item>
                <van-grid-item  class="grid-item">
                  <i class="iconfont iconzuopin" slot="icon" ></i>
                  <span slot="text">作品</span>
                </van-grid-item>
         </van-grid>

<van-cell-group >
    <van-cell  value="消息通知" is-link />
    <van-cell value="实名认证" is-link  />
</van-cell-group>
<van-cell-group left clickable>
    <van-cell value="用户反馈"  is-link  />
    <van-cell value="小智同学"  is-link />
    <van-cell value="系统设置" is-link  />
</van-cell-group>
<van-button type="warning" size="large" round class="thebutton" @click="outLogin" v-if="this.$store.state.user">退出登录</van-button>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
import { getUserList } from '@/api/user.js'
export default {
  data () {
    return {
      userList: {}
    }
  },
  methods: {
    async loadUserLisr () {
      try {
        const { data: res } = await getUserList()
        console.log(res)
        this.userList = res.data
      } catch {
        this.$toast.fail('获取用户数据失败')
      }
    },
    outLogin () {
      this.$dialog.confirm({
        title: '确认退出?'
      })
        .then(val => {
          this.$store.commit('setUser', null)
        })
        .catch(val => {
          console.log('真的退出了')
        })
    }
  },
  computed: {
  },
  created () {
    if (this.$store.state.user) {
      this.loadUserLisr()
    }
  }
}
</script>
<style lang="less" scoped>
.header{
  height: 361px;
  background: url('~@/assets/banner.png') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font-size: 35px;
  .mobile-img{
    width: 150px;
    height: 150x;
    margin-bottom: 10px;
  }
}
.van-cell__value{
  padding-left: 25px;
}
.van-cell-group{
  margin-top: 10px;
}
.grid-nav{
  .grid-item{
  height: 141px;
    i.iconfont {
      font-size: 45px;
    }
    span{
      font-size: 28px;
    }
    .iconshoucang{
      color: #eb5253;
    }
    .iconlishi{
    color: #ff9b1d;
    }
    .iconzuopin{
      color: #3296fa;
    }
}
}
.user-info{
    height: 361px;
  background: url('~@/assets/banner.png') no-repeat;
  background-size: cover;
  .base-info{
    height: 231px;
    padding: 76px 32px 23px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      font-size: 30px;
      color: #fff;
      .avatar{
    border: 1px solid #fff;
      margin-right: 23px;
      height: 132px;
      width: 132px;
    }
    }
  }
  .data-status{
    height: 130px;
    display: flex;
    .data-item{
      flex: 1;
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .count {
        font-size: 36px;
      }
      .text{
        font-size: 23px;
      }
    }
  }
}
.thebutton{
  margin:10px  !important;
  width: 90%;
}
</style>
