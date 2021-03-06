import { createStore } from 'vuex'

import createPersistedState from "vuex-persistedstate"
import * as Cookies from "js-cookie"
import api from "@/common/baseProxy"
import createSongLyricList from "@/utils/createSongLyricList"

export default createStore({
  state: {
    themeColor: '#FAAD14',
    isLogin: false,
    isShowLoginWindow: false,
    userId: '',
    userInfo: {},
    isPlayState: false,
    currentTime: 0,
    duration: 0,
    modeNum: 2, // 循环播放
    modeIcon: [
      {
        icon: 'icon-danquxunhuan',
        title: '单曲循环',
      },
      {
        icon: 'icon-suijibofang1',
        title: '随机播放',
      },
      {
        icon: 'icon-liebiaoxunhuan2',
        title: '循环播放',
      },
    ],
    // 当前歌曲播放列表
    playSongList: [],
    // audio元素对象
    audioEle: null,
    audioInfo: {
      pic: 'http://p3.music.126.net/PEQ69_EwVpuaBmmSkAY0SQ==/58274116284456.jpg',
      name: '歌名',
      author: '歌手',
      tags: [],
      src: '',
    },
    volume: 0.1,
    currentPlayIndex: 0,
    // 歌词
    songLyric: undefined,
    // 歌词播放的行数
    line: 0,
    top: 0,
    currentLyric: '',
    isShowDance: false,
    audioContext: null,
  },
  mutations: {
    setAudioContext(state,ctx){
      state.audioContext = ctx
    },
    setIsShowDance(state,b = true){
      state.isShowDance = b
    },
    setThemeColor(state,color){
      state.themeColor = color
    },
    setIsShowLoginWindow(state,b){
      state.isShowLoginWindow = b
    },
    setUserId(state,id){
      state.userId = id
    },
    setIsLogin(state,b){
      state.isLogin = b
    },
    setUserInfo(state,info){
      state.userInfo = info
    },
    setIsPlayState(state,b=true){
      state.isPlayState = b
    },
    setCurrentTime(state,t){
      state.currentTime = t
    },
    setDuration(state,t){
      state.duration = t
    },
    setVolume(state,v){
      state.volume = v
      state.audioEle.volume = v
    },
    setModeNum(state,n){
      state.modeNum = n
    },
    setAudioEle(state,ele){
      state.audioEle = ele
      state.audioEle.preload = 'auto'
      state.audioEle.crossOrigin = 'anonymous'
    },
    setAudioInfo(state,info={}){
      state.audioInfo = {
        ...state.audioInfo,
        ...info
      }
    },
    // 音乐播放
    playMusic(state){
      state.audioEle.volume = state.volume
      state.isPlayState = true
      state.audioEle.play()
    },
    setPlaySongList(state,list=[]){
      state.playSongList = list
    },
    setCurrentPlayIndex(state,index=0){
      state.currentPlayIndex = index
    },
    setSongLyric(state,lyric){
      state.songLyric = createSongLyricList(lyric)
    },
    playAndPause(state,){
      state.isPlayState = !state.isPlayState

      state.isPlayState ? state.audioEle.play() : state.audioEle.pause()
    },
    setCurrentLyric(state,lyric){
      state.currentLyric = lyric
    },
    setLine(state,time){
      time = parseInt(time)
      const index = state.songLyric.findIndex(item=>{
        return item.ms === time
      })
      if ( index !== -1 ){
        // console.log(index,state.songLyric[index]['text'])
        state.currentLyric = state.songLyric[index]['text']

        if ( state.line !== index ){
          state.line = index
        }
      }

    },
    setTop(state,line){
      if ( line > 5 && line < state.songLyric.length - 5 ){
        state.top = ( line - 5 ) * 20
      }
        // state.top = 0
    }
  },
  actions: {
    // 获取音乐播放地址
    async getMusicUrl({state,commit},payload){
      const {
        id,name,author,pic
      } = payload
      try {
        const res = await $axios.get(api +'/song/url?id='+id )
        const data = res['data']['data']
        if ( data.length && data[0]['url'] ){

          state.audioEle.src = data[0]['url']
          //
          state.audioInfo.id = id
          state.audioInfo.name = name
          state.audioInfo.author = author
          state.audioInfo.pic = pic
          state.audioInfo.src = data[0]['url']
          // commit('setAudioInfo',{
          //   id,name,author,pic,
          //   src: data[0]['url']
          // })

          return true
        }else {
          return false
        }
      }catch (e) {
        console.log(e.message)
      }
    },
    // 获取音乐的歌词
    async getMusicLyric({commit},id){
      try {

        const res = await $axios.get(api + '/lyric?id='+id)
        const result = res['data']['lrc']
        // console.log(result)
        if ( result ){
          commit('setSongLyric',result['lyric'])
        }else {
          commit('setSongLyric','[00:00.000] 纯音乐 无歌词')
        }
      }catch (e) {
        console.log(e.message)
      }
    }
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      paths: [
        'themeColor',
        'isLogin',
        'isShowLoginWindow',
        'userId',
        'userInfo',
        'volume',
        'audioEle',
        'playSongList',
        'currentPlayIndex'
      ],
      storage: {
        getItem: (key) => {
          return Cookies['get'](key)
        },
        setItem: (key, value) =>{
          Cookies['set'](key, value, { expires: 7, secure: false })
        },
        removeItem: (key) => Cookies['remove'](key),
      },
    }),
  ],
})
