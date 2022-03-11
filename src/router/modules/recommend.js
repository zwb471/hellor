import DiscoverMusicPage from "@/views/left-side-recommend/DiscoverMusicPage"
// import PrivateFmPage from "@/views/left-side-recommend/PrivateFmPage"
import VideoPage from "@/views/left-side-recommend/VideoPage"
import topMenuRoutes from "@/router/modules/topMenu"

const recommendRoutes = [
    {
        path: '/',
        name: 'discoverMusic',
        component: DiscoverMusicPage,
        meta: {
            title: '发现音乐',
            icon: () => <WifiOutlined/>
        },
        children: [
            // 顶级菜单
            ...topMenuRoutes
        ]
    },
    // {
    //     path: '/privateFM',
    //     component: PrivateFmPage,
    //     meta: {
    //         title: '私人FM',
    //         icon: () => <RedditOutlined/>
    //     }
    // },
    {
        path: '/video',
        component: VideoPage,
        meta: {
            title: '视频',
            icon: () => <VideoCameraAddOutlined/>,
            auth: true,
        }
    },
]

export default recommendRoutes