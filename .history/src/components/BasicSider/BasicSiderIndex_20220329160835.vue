<template>
  <div class='BasicSiderIndex basic-sider'>
    <a-menu
      mode="inline"
      theme="light"
      :inline-collapsed="false"
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @openChange="openChange"
    >
      <a-menu-item-group key="sub1">
          <template #title>
            <span>
              <SmileOutlined spin style="font-size: 16px"/>
              <span style="margin-left: 5px">推荐</span>
            </span>
          </template>

          <a-menu-item
            v-for="(item,index) in recommendRoutes"
            :key="item['path']"
          >
            <router-link :to="item['path']" class="link" :style="{color: $store.state.themeColor}">
              <MenuIcon :icon="item['meta']['icon']"/>
              {{item['meta']['title']}}
            </router-link>
          </a-menu-item>
      </a-menu-item-group>

      <a-menu-item-group key="sub2">
        <template #title>
            <span>
              <SmileOutlined spin style="font-size: 16px"/>
              <span style="margin-left: 5px">我的音乐</span>
            </span>
        </template>

        <a-menu-item
          v-for="(item,index) in myMusicRoutes"
          :key="item['path'] ||item['name']"
        >
          <router-link :to="item['path']" class="link" :style="{color: $store.state.themeColor}">
            <MenuIcon :icon="item['meta']['icon']" />
            {{item['meta']['title']}}
          </router-link>
        </a-menu-item>
      </a-menu-item-group>


      <a-sub-menu key="sub3">
        <template #title>
          <span>
            <FrownOutlined spin style="font-size: 16px;color: #c62f2f;"/>
            <span >创建歌单</span>
          </span>

        <!--动态创建歌单-->
        <a-popover
            v-model:visible="visible"
            title="新建歌单"
            trigger="click"
            placement="rightTop"
            @click.stop
        >
          <template #content>
            <Create v-model:songSheetName="songSheetName" v-model:songSheetPrivacy="songSheetPrivacy"/>

            <a-button type="primary" :loading="loading" @click.stop="addSongSheet()">创建</a-button>
            <a-button @click="visible=false">取消</a-button>
          </template>

          <a-button><FolderAddOutlined /></a-button>
        </a-popover>
        </template>


        <a-menu style="margin-left: 8px" >
          <a-menu-item v-for="(item,index) in createSongList" :key="item['id']">

            <!--右键菜单-->
            <a-dropdown :trigger="['contextmenu']">
              <router-link :to="`/songList/${item['id']}`" class="link">
                <OrderedListOutlined />
                {{item['name']}}
              </router-link>

              <!--右键要删除的歌单-->
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">
                    <div @click="handleDelSongSheet(item['id'])">
                      <DeleteOutlined />
                      <span>删除歌单</span>
                    </div>
                  </a-menu-item>

                  <a-menu-item key="2">
                    <div>
                      <PlayCircleOutlined />
                      <span>播放全部</span>
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>

            </a-dropdown>
            <!--右键菜单-->
          </a-menu-item>

        </a-menu>
      </a-sub-menu>

    </a-menu>
  </div>
</template>

<script>
import {onMounted, reactive, toRefs, watchEffect} from "vue"
import Create from "@/components/BasicSider/Create"

import Cookies from "js-cookie"
import {useStore} from "vuex"
import api from "@/common/baseProxy"

import myMusicRoutes from "@/router/modules/myMusic"
import recommendRoutes from "@/router/modules/recommend"

export default {
  name: "BasicSiderIndex",
  components: {Create},
  setup(){
    const {state} = useStore()

    // const recommend = [
    //   {name: 'discover_music', meta: {title: '发现音乐',icon: ()=><WifiOutlined />},},
    //   {name: 'private_fm',meta: {title: '私人FM',icon: ()=><RedditOutlined />},},
    //   {name: 'mv',meta: {title: '视频',icon: ()=><VideoCameraAddOutlined />},},
    // ]

    const sideState = reactive({
      openKeys: ['sub1','sub2'],
      selectedKeys: ['/'],
      rootSubmenuKeys: ['sub1','sub2','sub3'],
      openChange: openKeys => {
        const latestOpenKey = openKeys.find(key => sideState.openKeys.indexOf(key) === -1);

        if (sideState.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          sideState.openKeys = openKeys;
        } else {
          sideState.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      }
    })

    const sideCreateState = reactive({
      createSongList: [],
      visible: false,
      loading: false,
      songSheetName: '',
      songSheetPrivacy: false,
      // 创建歌单
      async addSongSheet(){
        try {
          const {songSheetName,songSheetPrivacy,visible} = this

          this.loading = true
          const res = await $axios.get(  '/api/playlist/create?name='+songSheetName+'&privacy='+(songSheetPrivacy?'10':''))
          const code = res['data'] && res['data']['code']
          if ( code === 200 ){
            await this.getUserPlayList()
            setTimeout(()=>{
              this.visible = false
              this.loading = false
            },300)
          }
        }catch (e) {
          console.log(e.message)
        }
      },
      // 获取用户播放的歌单列表
      async getUserPlayList(){
        try {
          const userId = Cookies.get('userId')
          // const res = await $axios.get( api + '/user/playlist?uid='+userId+'&t='+Date.now())
          const res = await $axios.get( '/api/user/playlist?uid='+userId+'&t='+Date.now())
          this.createSongList = res['data']['playlist']
        }catch (e) {
          console.log(e.message)
        }
      },
      // 删除歌单
      async handleDelSongSheet(id){
        try {
          const res = await $axios.get( api + '/playlist/delete?id='+id)
          const code = res['data'] && res['data']['code']
          if  ( code === 200 ){
            await this.getUserPlayList()
          }
        }catch (e) {
          console.log(e.message)
        }
      }
    })


    watchEffect(()=>{
      if ( state.isLogin ){
        sideCreateState.getUserPlayList()
      }
    })

    onMounted(()=>{
      document.oncontextmenu = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    })

    return {
      ...toRefs(sideState),
      // recommend,
      ...toRefs(sideCreateState),
      myMusicRoutes,
      recommendRoutes,
    }
  }
}
</script>

<style lang="less" scoped>
.basic-sider{
  background: #fff;
  user-select: none;

  //左侧菜单-左边框
  /deep/ .ant-menu-item-selected {color:rgba(0, 0, 0, 0.95)}
  /deep/ .ant-menu-vertical .ant-menu-item::after,
  /deep/ .ant-menu-vertical-left .ant-menu-item::after,
  /deep/ .ant-menu-vertical-right .ant-menu-item::after,
  /deep/ .ant-menu-inline .ant-menu-item::after{
    left: 0;
    border-left: 3px solid #c62f2f !important;
    border-right: none;
  }
  /deep/ .ant-menu-submenu-title{
    padding-left: 16px !important;
  }

  /deep/ .ant-menu-item{
    margin-bottom: 0 !important;
  }

  /deep/ .ant-btn{
    padding: 0 !important;
    margin-left: 20px;
    border: none !important;
  }
}


</style>