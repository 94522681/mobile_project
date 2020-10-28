<template>
    <div>
      <van-cell  icon="search" v-for="(item ,index) in list" :key="index" @click="searchSuggestion(index)">
        <div slot="title" v-html="item"></div>
      </van-cell>
    </div>
</template>
<script>
import { getSuggestion } from '@/api/search.js'
import { debounce } from 'lodash'
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
      theOriginList: []// 用来给父组件传值
    }
  },
  methods: {
    searchit: debounce(async function () {
      console.log(1)
      try {
        const { data: res } = await getSuggestion(this.searchValue)
        const reg = new RegExp(this.searchValue, 'gi')
        this.theOriginList = [...res.data.options]
        const arr = this.theOriginList.map(item => {
          return item.replace(reg, `<span style="color: red">${this.searchValue}</span>`)
        })
        this.list = [...arr]
      } catch (err) {
        console.log(err)
      }
    }, 200),
    searchSuggestion (index) {
      this.$emit('tosearchItem', this.theOriginList[index])
    }
  },
  watch: {
    searchValue: {
      handler: 'searchit',
      immediate: true
    }
  }
}
</script>
