<template>
  <div class='MusicPlayHistoryPage'>
    <GlobalSongListTable :song-list="$store.state.playSongList"/>
  </div>
</template>

<script>
import GlobalSongListTable from "@/components/Global/GlobalSongListTable"
export default {
  name: "MusicPlayHistoryPage",
  components: {GlobalSongListTable}
}
</script>

<style scoped>

</style>