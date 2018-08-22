import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
import store from 'store'

// noinspection JSAnnotator
export default {
    ///////////////////////////////////////////////////////////////////////禁止返回键

    //////////////////////////////////////////////////////////////////////是否有权限
    isHasPerssion(keyvalue){
        var perssionArr = store.state.home.menuSetting.perssionArr
        var res = perssionArr.indexOf(keyvalue)

        if (res === -1) {
            return false
        }
        return true
    },
    //////////////////////////////////////////////////////////////////////验证弹框
    confirm(text, success, cancel){
        MessageBox.confirm(text, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then( () => {
            if (success){
                success()
            }

        }).catch(() => {
            if (cansel){
                cancel()
            }
            Message.info({
                type: 'info',
                duration: 1500,
                showClose: true,
                message: '已取消操作'
            });
        });
    },
    confirmDelet(text, success, cancel){
        MessageBox.confirm(text, '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then( () => {
            if (success){
                success()
            }
        }).catch(() => {
            if (cansel){
                cancel()
            }
            Message.info({
                type: 'info',
                duration: 1500,
                showClose: true,
                message: '已取消删除'
            });
        });
    },
    //////////////////////////////////////////////////////////////////////深拷贝
    deepCopy(initalObj) {
        var obj = {};
        obj = JSON.parse(JSON.stringify(initalObj));
        return obj;
    },
    //////////////////////////////////////////////////////////////////////随机编码
    MathRand(type) {
        let sixNum = ''
        let myDate = new Date()
        let monthArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
        let day = myDate.getDate().toString() > 9 ? myDate.getDate() : '0' + myDate.getDate()

        for (let i = 0; i < 6; i++) {
            sixNum += Math.floor(Math.random() * 10);
        }
        return type + '-' + myDate.getFullYear() + monthArr[myDate.getMonth()] + day + '-' + sixNum
    },
    MathRand2(type){
        let sixNum = ''

        for (let i = 0; i < 7; i++) {
            sixNum += Math.floor(Math.random() * 10);
        }
        return type + '-' + sixNum
    },
    splitUserName(str){
        if (str.length > 7) {
            return str.substring(0, 6) + '...'
        } else {
            return str
        }
    },
    //////////////////////////////////////////////////////////////////////时间戳计算时间
    computeTime(start, end){
        var contTime = parseFloat(end) - parseFloat(start)
        var day = Math.round(contTime / 86400)
        var reshour = contTime % 86400
        var hour = Math.round(reshour / 3600)
        var resmin = reshour % 3600
        var min = Math.round(resmin / 60)

        if (hour < 10) {
            hour = '0' + hour
        }
        if (min < 10) {
            min = '0' + min
        }
        return day + '天' + hour + '小时' + min + '分'

    }

}
