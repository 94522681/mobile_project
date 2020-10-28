<template>
  <div class="channel">
    <div class="first">
           <van-cell title="我的频道" >
              <van-button plain type="danger" @click="toEdit"  size="mini" slot="default" round>{{showClear? '完成':'编辑'}}</van-button>
            </van-cell>
          <van-grid :border='false'>
                <van-grid-item  @click="clearMyChannels(item,index)"  v-for="(item,index) in mychannels" :key="item.id" >
                  <span slot="text" :class="['van-grid-item__text',item.id ===$store.state.activeChannel?'active-channel':'']">{{item.name}}</span>
                  <van-icon name="clear"  slot="icon" class="thecrossicon" v-if="showClear&&!(item.id ===$store.state.activeChannel)"/></van-grid-item>
          </van-grid>
    </div>
    <div class="second">
            <van-cell title="频道推荐" />
           <van-grid :border='false' direction="horizontal">
                <van-grid-item icon="plus" :text="item.name"  v-for="item in recommendChannels " :key="item.id" @click="addChannel(item)"/>
          </van-grid>
    </div>

  </div>
</template>

<script>
import { getAllChannels } from '@/api/passage.js'
export default {
  props: {
    mychannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      showClear: false
    }
  },
  methods: {
    async getAllChannelsList () {
      try {
        const { data: res } = await getAllChannels()
        this.allChannels = res.data.channels
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    addChannel (item) {
      this.$emit('addChannel', item)
    },
    toEdit () {
      this.showClear = !this.showClear
    },
    clearMyChannels (item, index) {
      if (item.id === 0) return 0
      if (!this.showClear) {
        this.$store.state.activeChannel = item.id
        console.log(this.$store.state.activeChannel)
        this.$store.commit('changePopShow', false)
      } else {
        this.$emit('clearChannelItem', {
          item, index
        })
        // this.mychannels = this.mychannels.filter(myitem => myitem.id !== item.id)
      }
    }
  },
  created () {
    this.getAllChannelsList()
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter(item => {
        return !this.mychannels.find(myitem => myitem.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .active-channel{
  color:red!important;
}
 .channel{
   height: 100%;
/deep/ .van-cell{
  height: 65px;
  margin: 0;
  padding: 0;
  line-height: 65px;
  padding: 0 24px;
  .van-cell__value{
      height: 100%;
      z-index: 100;
    }
 .van-cell__title{
   span{
      font-size: 32px;
      z-index: 100;
   }
  }
/deep/ .van-button--round{
    width: 120px;
    height: 50px;
    z-index: 111;
}
}
/deep/ .van-grid{
  margin: 30px 30px;
  margin-bottom: 5px;
  .van-grid-item__icon{
    font-size: 35px;
  }
  .van-grid-item__content--horizontal .van-grid-item__icon+.van-grid-item__text{
    margin-left: 0;
  }
  .van-grid-item__icon-wrapper{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 28px;
    transform: translate(-6%,-24%);
  }
 .van-grid-item__content--center{
    margin: 0;
    padding: 0;
    margin-bottom: 30px;
    width: 165px;
    height: 86px;
    flex: 1;
    background: #F4F5F6;
    border-radius: 6px;
    z-index: 111;
     .van-grid-item__text{
      white-space:nowrap;
      line-height:86px ;
      text-align: center;
      font-size: 28px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: #222222;
    }
}
}

}

</style>
