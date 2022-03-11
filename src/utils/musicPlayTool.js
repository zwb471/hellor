import { notification } from 'ant-design-vue';

import store from '../store'
import getSingerName from "@/utils/getSingerName"

const musicPlayTool = async (playSongLost,index)=>{
    if( store.state.playSongList.length ){
        const r = await store.dispatch('getMusicUrl',{
            id: playSongLost[index]['id'],
            name: playSongLost[index]['name'],
            author: playSongLost[index]['ar'] ? getSingerName(playSongLost[index]['ar']) : getSingerName(playSongLost[index]['artists']),
            pic: playSongLost[index]['ar'] ? playSongLost[index]['al']['picUrl'] : playSongLost[index]['album']['picUrl'],
        })

        // 判断歌曲 是否有版权
        if (  !r ){
            notification.open({
                message: '此歌曲无版权，无法播放',
                description: playSongLost[index]['name'],
                onClick: () => {
                    console.log('Notification Clicked!')
                },
            })
            store.commit('setCurrentPlayIndex',index+1)
            return false
        }

        // 获取 歌词
        await store.dispatch('getMusicLyric',playSongLost[index]['id'])

        store.commit('setLine',0)
        // 播放音乐
        store.commit('playMusic')

    }


}

export default musicPlayTool