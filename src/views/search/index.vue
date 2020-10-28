<template>
  <div class="searchPage">
    <!-- <div class="searchDiv">
      <input type="text" v-model="searchValue" class="searchInput">
      <span class="xuxiao">取消</span>
    </div> -->
    <form action="/">
      <van-search
        v-model="searchValue"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
          background="#4fc08d"
        shape="round"
        clearable
        @focus='isResultShow=false'
      />
    </form>
    <div class="mainView">
        <search-result v-if="isResultShow" :searchValue="searchValue"></search-result>
        <search-Suggestion v-else-if="searchValue" :searchValue="searchValue" @tosearchItem="tosearchItem"></search-Suggestion>
        <search-history v-else :historyList="historyList" @searchHistoryItem="searchHistoryItem"></search-history>
    </div>
  </div>
</template>

<script>
import SearchResult from './components/searchResult.vue'
import SearchSuggestion from './components/searchSuggestion.vue'
import SearchHistory from './components/searchHistory.vue'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  data () {
    return {
      searchValue: '',
      isResultShow: false,
      historyList: getItem('localhistory') || []
    }
  },
  methods: {
    onCancel () {
      this.$router.go(-1)
    },
    onSearch () {
      if (!this.$store.state.user) {
        const index = this.historyList.indexOf(this.searchValue)
        // 去除重复的历史记录,并发最新的放在历史记录的头部
        if (index !== -1) {
          this.historyList.splice(index, 1)
        }
        this.historyList.unshift(this.searchValue)
        setItem('localhistory', this.historyList)
      }
      this.isResultShow = true
    },
    searchHistoryItem (value) {
      this.searchValue = value
      this.isResultShow = true
    },
    // 点击建议列表的数据
    tosearchItem (value) {
      this.searchValue = value
      this.onSearch()
    }
  },
  components: {
    SearchResult,
    SearchSuggestion,
    SearchHistory
  },
  created () {
    if (!getItem('localhistory')) {
      setItem('localhistory', [])
    }
  }
}
</script>

<style lang="less" scoped>
.searchPage{
  // box-sizing: border-box;
  // margin-top: 108px;
  position: relative;
  .mainView{
    margin-top: 108px;
  }
  /deep/ .van-search{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
  .searchDiv{
      height: 100px;
      width: 100%;
      padding: 17px 37px 17px 34px ;
      background-color: #3296FA;
      box-sizing: border-box;
      .searchInput{
        display: inline-block;
        width: 589px;
        height: 56px;
        background: #F4F5F6;
        border: 1px solid #E8E8E8;
        border-radius: 6px;
      }
      .xuxiao{
        width: 57px;
        height: 28px;
        font-size: 28px;
        font-family: MicrosoftYaHei;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 36px;
      }
    }
}
</style>
