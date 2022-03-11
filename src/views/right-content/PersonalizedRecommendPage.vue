<template>
  <div class='PersonalizedRecommendPage'>
    <!--轮播图开始-->
    <Banner
      :list="bannerList"
      res="slider"
      :auto-play="true"
      :data-w="width"
      :height="width * 0.7 * 0.372"
      @sliderClick="onSliderClick"
    />
    <!--轮播图结束-->

    <!--推荐MV-->
    <a-card title="推荐MV">
      <template #extra>
        <a href="javascript:">更多 <ArrowRightOutlined /></a>
      </template>

      <MV />
    </a-card>
    <!--推荐MV-->

    <!--推荐歌单-->
    <a-card title="推荐歌单">
      <template #extra>
        <a href="javascript:">更多 <ArrowRightOutlined /></a>
      </template>

      <SongSheet />
    </a-card>
    <!--推荐歌单-->

    <!--主播电台-->
    <a-card title="主播电台">
      <template #extra>
        <a href="javascript:">更多 <ArrowRightOutlined /></a>
      </template>

      <Dj />
    </a-card>
    <!--主播电台-->
  </div>
</template>

<script>
import Banner from "@/components/Global/Banner"
import {reactive, toRefs} from "vue"
import api from "@/common/baseProxy"
import MV from "@/components/BasicContent/Personalized/MV"
import SongSheet from "@/components/BasicContent/Personalized/SongSheet"
import Dj from "@/components/BasicContent/Personalized/Dj"
export default {
  name: "PersonalizedRecommendPage",
  components: {Dj, SongSheet, MV, Banner},
  setup(){
    const personalizedState = reactive({
      bannerList: [],
      width: 1000,
      slider: null,
      async getBannerList(){
          try {
            const res = await $axios.get(api+'/banner?type=0')
            this.bannerList = res['data']['banners']
          }catch (e) {
            console.log(e.message)
          }
      },
      onSliderClick(i,item){
        if (item.url){
          window.open(item.url)
        }
      }
    })
    personalizedState.getBannerList()

    return {
      ...toRefs(personalizedState),
    }
  }
}
</script>

<style scoped>

</style>