import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home/home'
import { Message } from 'element-ui'

Vue.use(Router)

var router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home,
            children: [
                // {name: "首页", path: '/main', component: () => import('@/views/home/main')},
                /*************************** 妈妈官网*************************************/
                {name: "案例列表", path: '/caseList', component: () => import('@/views/case/caseList')},
                {name: "新增案例", path: '/addcase', component: () => import('@/views/case/addcase')},
                {name: "案例详情", path: '/caseDetail', component: () => import('@/views/case/caseDetail')},

                {name: "新闻列表", path: '/newsList', component: () => import('@/views/news/newsList')},
                {name: "新增新闻", path: '/addnews', component: () => import('@/views/news/addnews')},
                {name: "新闻详情", path: '/newsDetail', component: () => import('@/views/news/newsDetail')},

                {name: "招聘列表", path: '/recruitList', component: () => import('@/views/recruit/recruitList')},
                {name: "招聘部门", path: '/recruitPart', component: () => import('@/views/recruit/recruitPart')},
                {name: "添加招聘信息", path: '/addrecruit', component: () => import('@/views/recruit/addrecruit')},
                {name: "招聘详情", path: '/recruitDetail', component: () => import('@/views/recruit/recruitDetail')},

                {name: "关于我们", path: '/about', component: () => import('@/views/about/index')},
                {name: "发展历程", path: '/develop', component: () => import('@/views/about/develop')},
                {name: "核心团队", path: '/team', component: () => import('@/views/about/team')},
                {name: "战略合作伙伴", path: '/partner', component: () => import('@/views/about/partner')},
                {name: "特色优势", path: '/feature', component: () => import('@/views/about/feature')},
                {name: "企业文化", path: '/culture', component: () => import('@/views/about/culture')},

                {name: "商学院公开课", path: '/college', component: () => import('@/views/college/class')},
                {name: "学员反馈", path: '/reply', component: () => import('@/views/college/reply')},

                {name: "修改密码", path: '/editPassword', component: () => import('@/views/login/editPassword')}

            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/login')
        }

    ]
})

router.beforeEach((to, from, next) => {
    // 登录拦截
    if (to.fullPath == '/'){
        if (sessionStorage.getItem('user')){
            next({ path: '/main' })
            return
        } else {
            Message({
                message: '会话已过期,请重新登录!',
                showClose: true,
                type: 'warning'
            });

            next({ path: '/login' })
            return
        }
    } else if (to.fullPath == '/login'){
        next();
        return
    } else {
        if (sessionStorage.getItem('user')){
            next();
            return
        } else {
            Message({
                message: '会话已过期,请重新登录!',
                showClose: true,
                type: 'warning'
            });

            next({ path: '/login' })
            return
        }
    }
})
export default router
