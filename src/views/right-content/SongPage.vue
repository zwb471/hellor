<template>
  <div class='SongPage'>

    <div class="main-con">
      <div class="left-main-con">
        <PlayDisc :id="id"/>

        <div class="song-info">
          <SongBaseInfo :title="audioInfo['name']" :author="audioInfo['author']" :tags="[]"/>

          <Lyric :styles="{color: '#333'}"/>
        </div>
      </div>
    </div>

    <div class="right-aside">
      <div class="wrapper">
        <SideHotSongSheet />

        <SideSongs :id="id" />
      </div>
    </div>

  </div>
</template>

<script>
import PlayDisc from "@/components/Global/PlayDisc"
import SongBaseInfo from "@/components/Global/SongBaseInfo"
import {useStore} from "vuex"
import {toRefs} from "vue"
import Lyric from "@/components/Global/play/Lyric"
import SideHotSongSheet from "@/components/Global/SideHotSongSheet"
import SideSongs from "@/components/Global/SideSongs"
export default {
  name: "SongPage",
  components: {SideSongs, SideHotSongSheet, Lyric, SongBaseInfo, PlayDisc},
  props: ['id'],
  setup(){
    const {state,} = useStore()


    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.SongPage{
  width: 980px;
  min-height: 700px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #d3d3d3;
  border-width: 0 1px;

  padding-top: 60px;

  background: url("/static/wrap4.png") repeat-y center 0;

  display: flex;

  .main-con{
    width: 710px;
  }

  .left-main-con{

    display: flex;

    .song-info{
      flex: 1;
      overflow: hidden;
    }
  }

  .right-aside{
    flex: 1;
    //border: 1px solid blue;
    //padding: 0 30px;

    .wrapper{
      width: 200px;
      margin: auto;
    }
  }



}
</style>