import router from 'router'
import store from 'store'
const customDirective = {}

customDirective.install = Vue => {

    //自定义指令 路由后退一步
    Vue.directive('RouterBack', function(el, binding){
        el.onclick = function(){
            router.go(-1)
        }
    })

    //验证是否有权限
    Vue.directive('perss', function(el, binding){
        var perssionArr = store.state.home.menuSetting.perssionArr
        let hasPermisson = perssionArr.indexOf(binding.value)

        if (hasPermisson === -1){
            el.style.display = "none"
        }
    })
}

export default customDirective
