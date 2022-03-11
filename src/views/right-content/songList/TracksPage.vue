<template>
  <div class='TracksPage'>
    <global-song-list-table :song-list="SongList"/>
  </div>
</template>

<script>
import GlobalSongListTable from "@/components/Global/GlobalSongListTable"
import {ref, watchEffect} from "vue"
import {useRoute} from "vue-router"
import api from "@/common/baseProxy"
export default {
  name: "TracksPage",
  components: {GlobalSongListTable},
  alias: '根据歌单id获取歌曲列表',
  props: ['id'],
  setup(props){
    const SongList = ref([])

    const getSongList = async (id) => {
      try {
        const res = await $axios.get(api + '/playlist/detail?id='+id)
        SongList.value.push(...res['data']['playlist']['tracks'])
      }catch (e) {
        console.log(e.message)
      }
    }
    watchEffect(()=>{
      getSongList(props.id)
    })


    return {
      SongList,
    }
  }
}
</script>

<style scoped>

</style>