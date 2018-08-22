// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import store from './store'
import 'vue2-animate/dist/vue2-animate.min.css'
import 'jquery'
import directive from './directive/customDirective'
// 引入代码填充,解决浏览器兼容问题n
import 'babel-polyfill'

import 'element-ui/lib/theme-chalk/index.css' //引入elementUI主题样式

// 引入全局css
import './assets/css/bootstrap.css'
import './assets/css/animate.css'
import './assets/css/font-awesome.min.css'
import './assets/css/simple-line-icons.css'
import './assets/css/font.css'

// 自定义公共样式文件
import './assets/css/app.css'

import myBase from './utils/base'
import * as filters from './utils/filters'
Vue.config.productionTip = false

/* eslint-disable no-new */

Vue.use(ElementUI)
Vue.use(directive)
//自定义全局变量和函数

Vue.prototype.myBase = myBase

// myBase.backSpaceBiden()  //禁用浏览器返回键


// 进入页面重新获取屏幕可视高度
var winheight = document.documentElement.clientHeight;
var winwidth = document.documentElement.clientWidth;

store.commit('setDevice', {width: winwidth, height: winheight});
store.commit('setModelContentHeight', winheight - 100);

// 定义过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
router.push({
    path: '/caseList'
});

window.onresize = function(){
    winheight = document.documentElement.clientHeight
    winwidth = document.documentElement.clientWidth
    if (winheight < 700){
        winheight = 700
    }
    if (winwidth < 1360){
        winwidth = 1360
    }

    store.commit('setDevice', {width: winwidth, height: winheight})
    store.commit('setModelContentHeight', winheight - 100)
}
