<template>
  <div>
    <router-view></router-view>
    <van-tabbar  class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <i class="iconfont iconshouye" slot="icon"></i>
         <span class="text">首页</span>
        </van-tabbar-item>
      <van-tabbar-item  to="/wenda">
        <i class="iconfont iconwenda"  slot="icon"></i>
        <span class="text">问答</span>
        </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i class="iconfont iconshipin"  slot="icon"></i>
         <span class="text">视频</span>
        </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i class="iconfont iconwode"  slot="icon"></i>
         <span class="text">{{this.$store.state.user? '我的':'未登录'}}</span>
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.layout-tabbar{
  i.iconfont {
    font-size: 40px;
  }
  span.text{
    font-size: 20px;
  }
}
</style>
