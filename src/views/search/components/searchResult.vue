<template>
    <div>
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
</div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 20
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data: res } = await getSearchResult({
          page: this.page,
          per_page: this.perpage,
          q: this.searchValue
        })
        console.log(res)
        this.list.push(...res.data.results)
        this.total = res.data.total_count
        this.loading = false
        if (res.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {

      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
