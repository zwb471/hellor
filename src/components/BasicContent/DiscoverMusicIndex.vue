<template>
  <div class='DiscoverMusicIndex'>
    <a-tabs
      v-model:activeKey="activeKey"
      :tabBarGutter="30"
      @tabClick="tabClick"
    >
      <a-tab-pane v-for="item in topMenuRoutes" :key="item['path']">
        <template #tab>
          <router-link :exact="true" :style="{color: $store.state.themeColor}" :to="item['path']">{{item['meta']['title']}}</router-link>
        </template>
      </a-tab-pane>
    </a-tabs>

    <router-view />

  </div>
</template>

<script>
import {reactive, toRefs, watchEffect, watch,} from "vue"
import {useRouter,useRoute,} from "vue-router"
import topMenuRoutes from "@/router/modules/topMenu"

export default {
  name: "DiscoverMusicIndex",
  setup(){
    const Router = useRouter()
    const Route = useRoute()

    const discoverState = reactive({
      activeKey: '/',
      tabClick(){},
    })
    watch(()=>discoverState.activeKey,(v)=>{
      Router.push(discoverState.activeKey)
    },{
      immediate: true,
    })

    watchEffect(()=>{
      if ( Route['path'] ){
        const isTrue = topMenuRoutes.some((item,index)=>{
          return item['path'] === Route['path']
        })

        if (isTrue){
          discoverState.activeKey = Route['path']
        }
      }

    })

    return {
        ...toRefs(discoverState),
      topMenuRoutes,
    }
  }
}
</script>

<style scoped>
/deep/ .ant-tabs-top-bar{
  border-bottom: 1px solid #ddd !important;
}
</style>