<template>
  <div class='DiscoverMusicPage'>
    <Suspense>
      <template #default>
       <DiscoverMusicIndex />
      </template>
      <template #fallback>
        <Loading text="正在为您生成个性化设置..."/>
      </template>
    </Suspense>
  </div>
</template>

<script>
import {defineAsyncComponent} from "vue"

import Loading from "@/components/Global/Loading"

const DiscoverMusicIndex = defineAsyncComponent(()=>import("@/components/BasicContent/DiscoverMusicIndex"))

export default {
  name: "DiscoverMusicPage",
  components: {DiscoverMusicIndex, Loading}
}
</script>


<style scoped>

</style>