<template>
  <div class="themain">
<van-nav-bar class="page-nav-bar" fixed>
  <van-button slot="title" type="info" size="small" round icon="search" class="search-btn" @click="goSearch">搜索</van-button>
</van-nav-bar>
<van-tabs v-model="$store.state.activeChannel"  swipeable animated class="channel-tab">
  <van-tab :title="item.name" v-for="item in channels" :key="item.id" :name="item.id">
    <passage-list :channel="item"/>
  </van-tab>
  <div class="placeHolder" slot="nav-right"></div>
  <div slot="nav-right" class="hanmberger-icon" @click="showthepop">
    <i class="iconfont icongengduo"></i>
  </div>
</van-tabs>
<van-popup v-model="popshow" position="bottom" closeable close-icon-position="top-left" :style="{ height: '100%' }" class="edit-channel-popup">
  <channel-edit :mychannels="channels" @addChannel="addChannelit" @clearChannelItem="clearItem"></channel-edit>
</van-popup>
  </div>
</template>
<script>
import { getPinDao } from '../../api/home'
import giao from './components/passagelist'
import channeledit from '@/components/channel-edit'
import { addUserChannel, deleteChannel } from '@/api/passage'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      channels: []
    }
  },
  methods: {
    async getPinDaoList () {
      try {
        if (this.$store.state.user) {
          const { data: res } = await getPinDao()
          this.channels = res.data.channels
        } else {
          const localChannels = getItem('channels')
          if (localChannels) {
            // 有本地频道数据，则使用
            this.channels = localChannels
          } else {
            // 没有本地频道数据，则请求获取默认推荐的频道列表
            const { data } = await getPinDao()
            this.channels = data.data.channels
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    goSearch () {
      this.$router.push('/search')
    },
    showthepop () {
      this.$store.commit('changePopShow', true)
    },
    async addChannelit (item) {
      this.channels.push(item)
      try {
        if (this.$store.state.user) {
          const { data: res } = await addUserChannel([
            { id: item.id, seq: this.channels.length }
          ])
          console.log(res)
        } else {
          setItem('channels', this.channels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('数据获取失败')
      }
    },
    async clearItem (val) {
      this.channels.splice(val.index, 1)
      try {
        console.log(val.item.id)
        if (this.$store.state.user) {
          const { data: res } = await deleteChannel(val.item.id)
          console.log(res)
        } else {
          setItem('channels', this.channels)
        }
      } catch (err) {
        console.log(err)
        this.$toast('删除频道失败，请稍后重试')
      }
    }
  },
  created () {
    this.getPinDaoList()
  },
  components: {
    PassageList: giao,
    ChannelEdit: channeledit
  },
  computed: {
    popshow: {
      set: function (value) {
        this.$store.commit('changePopShow', false)
      },
      get: function () {
        return this.$store.state.popshow
      }
    }
  }
}
</script>
<style lang="less" scoped>
.themain{
  margin-bottom: 100px;
  padding-top: 174px;
  .page-nav-bar{

 .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border:none;
    font-size: 28px;
    .van-icon{
      font-size: 32px;
    }
  }

}
/deep/ .channel-tab{
  .van-tab{
    border-right: 1px solid #edeff3;
    min-width: 200px;
    font-size: 30px;
    color: #777777;
  }
  .van-tab--active {
    color: #333333;
  }
  .van-tabs__line{
    width: 50px;
    height: 6px;
    background-color: #3296fa;

  }
  .hanmberger-icon{
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    opacity: 0.902;
    background-color: #fff;
    i.iconfont {
      font-size: 33px;
    }
  }
  .placeHolder{
    width: 66px;
    height: 82px;
    // 不参与flex的空间计算
    flex-shrink: 0;
  }
}
}
.edit-channel-popup {
  padding-top: 100px;
  box-sizing: border-box;
}

</style>
