const MusicUploadPage = ()=>import(/* webpackChunkName: "my_music_download" */ "@/views/left-side-my-music/MusicUploadPage")
const MusicCloudPage = ()=>import(/* webpackChunkName: "my_music_collect" */ "@/views/left-side-my-music/MusicCloudPage")

const MusicPlayHistoryPage = ()=>import(/* webpackChunkName: "my_music_history" */"@/views/left-side-my-music/MusicPlayHistoryPage")

const myMusicRoutes = [
    {
        path: '/musicPlayHistory',
        component: MusicPlayHistoryPage,
        meta: {
            title: '最近播放',
            icon: ()=><HistoryOutlined />
        }
    },
    {
        path: '/musicUpload',
        component: MusicUploadPage,
        meta: {
            title: '上传云盘',
            icon: ()=><CloudUploadOutlined />,
            auth: true,
        }
    },
    {
        path: '/musicCloud',
        component: MusicCloudPage,
        meta: {
            title: '我的音乐云盘',
            icon: ()=><CloudOutlined />,
            auth: true,
        }
    },
]

export default myMusicRoutes