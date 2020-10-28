<template>
    <div class="thesearchHistory">
      <van-cell title="搜索历史">
        <van-icon name="delete" color="#07c160" @click="deleteAll" />
      </van-cell>
      <van-cell :title="item" icon="search" v-for="(item,index) in list" :key="index" @click="searchHistoryItem(item)" >
        <van-icon name="close" color="#07c160" slot="right-icon" @click.stop="deleteit(index)" />
      </van-cell>
    </div>
</template>
<script>
import { getSearhHistory, deleteSearhHistory } from '@/api/search'
import { setItem, getItem } from '@/utils/storage.js'

export default {
  props: {
    historyList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    searchHistoryItem (item) {
      console.log(1)
      this.$emit('searchHistoryItem', item)
    },
    // 获取用户搜做历史
    async getHistoryList () {
      try {
        if (this.$store.state.user) {
          const { data: res } = await getSearhHistory()
          this.list = res.data.keywords
        } else {
          this.list = this.historyList
        }
      } catch (err) {
        console.log(err)
      }
    },
    deleteit (index) {
      if (!this.$store.state.user) {
        var arr = getItem('localhistory')
        arr.splice(index, 1)
        setItem('localhistory', arr)
      }
      this.list.splice(index, 1)
    },
    deleteAll () {
      this.$dialog.confirm({
        title: '确认删除全部历史记录?'
      })
        .then(async val => {
          try {
            if (this.$store.state.user) {
              await deleteSearhHistory()
              this.getHistoryList()
            } else {
              setItem('localhistory', [])
              this.list = []
            }
          } catch (err) {
            console.log(err)
          }
        })
        .catch(val => {
          console.log('真的退出了')
        })
    }
  },
  created () {
    this.getHistoryList()
  }
}
</script>
<style lang="less" scoped>
.thesearchHistory{

}

</style>
