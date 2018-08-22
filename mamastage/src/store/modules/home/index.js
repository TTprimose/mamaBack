export default {
    state: {
        version: '1.0',
        langIsOpen:false,
        userCustomIsOpen:false,
        orgTreeIsHide:false,
        orgTreeWidth: 192,
        baseUrl: '',
        isFreshCarTree: false,
        timerArr: [],
        isNextMenuShow: false, //二级菜单是否显示
        device: {
            width: null,
            height: null
        },
        userInfo: {
            user: {
                userName: "admin"
            },
            loginPassword: "888888"
        },
        modelContentHeight: null,
        nextMenuMap: {
            // case: [
            //     {
            //         name: '案例列表',
            //         path: '/caseList'
            //     }
            // ],
            // news: [
            //     {
            //         name: '新闻列表',
            //         path: '/newsList'
            //     }
            // ],
            recruit: [
                {
                    name: '招聘列表',
                    path: '/recruitList'
                },
                {
                    name: '招聘部门',
                    path: '/recruitPart'
                }
            ],
            about: [
                {
                    name: '关于我们',
                    path: '/about'
                },
                {
                    name: '发展历程',
                    path: '/develop'
                },
                {
                    name: '核心团队',
                    path: '/team'
                },
                {
                    name: '战略合作伙伴',
                    path: '/partner'
                },
                {
                    name: '荣誉资质',
                    path: '/feature'
                },
                {
                    name: '企业文化',
                    path: '/culture'
                }
            ],
            college: [
                {
                    name: '公开课',
                    path: '/college'
                },
                {
                    name: '学员反馈',
                    path: '/reply'
                }
            ]
        }
    },
    mutations: {
        setDevice(state, value){
            state.device.width = value.width
            state.device.height = value.height
            window.localStorage.setItem("device", JSON.stringify(state.device))
        },
        setNextMenuShow(state, value){
            state.isNextMenuShow = value
        },
        setModelContentHeight(state, value){
            state.modelContentHeight = value
            console.log(state.modelContentHeight)
        },
        setUserInfo(state, value){
            state.userInfo = value
            window.localStorage.setItem("userInfo", JSON.stringify(value))
        }
    }
};
