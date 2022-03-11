<template>
  <div class='SideSongs'>
    <GlobalSlotHead>
      <template v-slot:title>
        <h2 >相似歌曲</h2>
      </template>
      <template v-slot:more>
        <h2 >&nbsp;</h2>
      </template>
    </GlobalSlotHead>

    <ul class="song-list">
      <li v-for="item in songs" :key="item.id">
        <div class="pic">
          <!--http://p3.music.126.net/wjFSDbo67AwzUzd-F5Zc2A==/109951164870573415.jpg?param=50y50-->
          <img :src="item.album.picUrl" width="100%" height="100%" alt="">
        </div>
        <div class="des">
          <p class="title">
            <a href="javascript:;">{{item.name}}</a>
          </p>
          <p class="author">
            <a href="javascript:;">by: {{ getArtistsName(item['artists']) }}</a>
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import GlobalSlotHead from "@/components/Global/GlobalSlotHead"
import {reactive, toRefs, watchEffect} from "vue"
import api from "@/common/baseProxy"
export default {
  name: "SideSongs",
  components: {GlobalSlotHead},
  props: ['id'],
  setup(props){
    const state = reactive({
      songs: [],
      getArtistsName(v){
        const arr = v.map((item)=>{
          return item.name
        })
        return arr.join(' ')
      },
      async getSideSongsData(id=347230){
        const res = await $axios.get(api + '/simi/song?id='+id)
        this.songs = res['data']['songs']
      }
    })
    state.getSideSongsData(props.id)

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="less" scoped>
.SideSongs{


  .song-list{
    margin-top: 20px;
    li{
      display: flex;
      margin-bottom: 15px;
      .pic{
        width: 50px;
        height: 50px;
        flex-shrink: 0;
        margin-right: 10px;

        img{
          width: 100%;
          height: 100%;
        }
      }
      .des{
        width: calc( 100% - 60px );
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        p{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0;
        }

        .title{
          a{
            color: #000;

          }
        }
        .author{
          color: #999;
          a{
            color: #666;
          }
        }

      }
    }
  }
}
</style>
