<template>
  <div >
    <van-cell class="thePassageItemMain"  :to="{
      name:'article',
      params:{
        articleId:passage.art_id
      }
    }">
      <div slot="title" :class="['title van-multi-ellipsis--l3',passage.cover.type==1?'setMargin43':'',passage.cover.type==0?'setMargin24':'']" >
        {{passage.title}}
      </div>
      <div slot="label">
        <div class="cover-image" v-if="passage.cover.type===3">
          <div class="cover-item" v-for="(item,index) in passage.cover.images" :key="index">
            <van-image
              width="100%"
              height="100%"
               fit="cover"
              :src="item"
            />
          </div>
        </div>
        <div class="tipsSpan">
           <span>{{passage.aut_name}}</span>
        <span>{{passage.comm_count}}</span>
        <span>{{passage.pubdate|relativeTime}}</span>
        </div>
      </div>
      <van-image
      v-if="passage.cover.type===1"
        slot="default"
        width="100%"
        height="100%"
        fit="cover"
        :src="passage.cover.images[0]"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    passage: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less">
.thePassageItemMain{
  .title {
    font-size: 32px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #3A3A3A;
    // margin-bottom: 43px;
  }
.cover-image{
  display: flex;
  .cover-item{
    flex:1;
    height: 146px;
    width: 232px;
    margin-top: 29px;
    margin-bottom: 31px;
    z-index: 111;
  }
}
.van-cell__value{
    width: 232px;
    height: 146px;
    z-index: 1211;
    margin-left: 25px;
    flex: unset;
}
.tipsSpan{
    width: 100%;
    height: 22px;
    font-size: 23px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #B4B4B4;
    span {
      margin-right: 25px;
    }
}
.setMargin24 {
  margin-bottom: 24px;
}
.setMargin43 {
  margin-bottom: 43px;
}
}
</style>
