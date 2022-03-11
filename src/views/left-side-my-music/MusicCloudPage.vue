<template>
  <div class='MusicCollectPage'>
    <TableDataComp :song-list="cloudList"/>
  </div>
</template>

<script>
import {reactive, toRefs} from "vue"
import api from "@/common/baseProxy"
import TableDataComp from "@/components/Global/TableDataComp"

export default {
  name: "MusicCollectPage",
  components: {TableDataComp},
  setup(){
    const myCloudMusicState = reactive({
      cloudList: [],
      async getCloudList(){
          try {
            const res = await $axios.get(api + '/user/cloud')
            // console.log(res['data']['data'])
            this.cloudList = res['data']['data']
          }catch (e) {
            console.log(e.message)
          }
      }
    })
    myCloudMusicState.getCloudList()

    return {
      ...toRefs(myCloudMusicState)
    }
  }
}
</script>

<style scoped>

</style>