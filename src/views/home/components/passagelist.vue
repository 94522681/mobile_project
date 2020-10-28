<template>
  <div class="passageMain">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :success-text="refreshText" success-duration="1000">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="listerror"
        error-text="请求失败，点击重新加载"
      >
        <!-- <van-cell v-for="item in list" :key="item.art_id" :title="item.title" /> -->
        <passage-item v-for="item in list" :key="item.art_id" :passage="item" ></passage-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getPassage } from '@/api/passage'
import PassageItem from '@/components/passageItem'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    PassageItem
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      listerror: false,
      refreshing: false,
      refreshText: ''
    }
  },
  methods: {
    async  onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        console.log(this.channel)
        const { data: res } = await getPassage({
          channel_id: this.channel.id,
          // timestamp简单理解就是庆七数据的页码
          // 请求第一页数据,当前最新事件戳
          timestamp: this.timestamp || Date.now(),
          with_top: 0
        })
        console.log(res)
        this.list.push(...res.data.results)
        this.loading = false
        if (res.data.results.length) {
          this.timestamp = res.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.listerror = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data: res } = await getPassage({
          channel_id: this.channel.id,
          // timestamp简单理解就是庆七数据的页码
          // 请求第一页数据,当前最新事件戳
          timestamp: Date.now(),
          with_top: 1
        })
        this.list.unshift(...res.data.results)
        this.refreshText = '刷新成功'
        this.refreshing = false
      } catch (err) {
        this.refreshText = '刷新失败'
        this.refreshing = false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.passageMain{
  height: 158vw;
  overflow-y: auto;
}
</style>
