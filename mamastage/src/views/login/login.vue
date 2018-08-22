<template>
    <div class="login_wrap">
        <div class="login_box">
            <div class="login_logo">
                <img src="../../../static/img/login/login_logo.png" alt="妈妈去哪儿">
            </div>
            <div class="login_content">
                <div class="login_title">登录</div>
                <div class="login_input_wrap">
                    <el-input
                        placeholder="账号"
                        v-model="userInfo.loginCode"
                        :style="{width: '320px'}"
                        clearable>
                    </el-input>
                </div>
                <div class="login_input_wrap">
                    <el-input
                        placeholder="密码"
                        v-model="userInfo.password"
                        :style="{width: '320px'}"
                        clearable
                        type="password"
                        @keyup.enter.native='loginEvent'>
                    </el-input>
                </div>
                <!--<div class="login_remPwd">-->
                    <!--<el-checkbox v-model="isRemPwd">记住密码</el-checkbox>-->
                <!--</div>-->
                <div class="login_loginBtn">
                    <el-button @click="loginEvent" class="logo_red" :style="{width: '320px'}" type="danger">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from 'api/case'
export default {
    data() {
        return {
            isRemPwd: false,
            userInfo: {
                loginCode: '',
                password: ''
            }
        }
    },
    computed: {

    },
    methods: {
        loginEvent(){
            if (this.userName == ""){
                this.$message({
                    message: '请输入账号',
                    showClose: true,
                    type: 'warning'
                });
                return
            }
            if (this.userPssd == ""){
                this.$message({
                    message: '请输入密码',
                    showClose: true,
                    type: 'warning'
                });
                return
            }

            api.postuserlogin(this.userInfo).then((response) => {
                // console.log(response.message)
                if (response.message == '用户会话失效！'){
                    this.$router.push({
                        path: '/login'
                    })
                    sessionStorage.clear()
                } else if (response.message == 'OK'){
                    sessionStorage.setItem("user", JSON.stringify(this.userInfo))
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                    this.$router.push({
                        path: '/caseList'
                    });

                } else {
                    this.$message({
                        message: response.message,
                        type: 'warning'
                    })
                }

            }).catch((error) => {
                this.$message({
                    message: '账号密码错误',
                    type: 'warning'
                });
            })

        }
    },
    created() {
        this.homeWidth = this.$store.state.home.device.width
        this.homeHeight = this.$store.state.home.device.height
    }
};
</script>
<style scoped>
    .login_wrap{
        width: 100%;
        height: 100%;
        background: #F5F5F5;

    }
    .login_box{
        width: 403px;
        height: 400px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }
    .login_logo{
        text-align: center;
        margin-bottom: 22px;
    }
    .login_content{
        background: #ffffff;
        height: 335px;
        border-radius: 3px;
    }
    .login_title{
        font-size: 18px;
        text-align: center;
        letter-spacing: 2px;
        color: #606266;
        padding: 30px 0;
    }
    .login_input_wrap{
        text-align: center;
        margin-bottom: 17px;
    }
    .login_remPwd{
        padding-left: 42px;
    }
    .login_loginBtn{
        padding: 40px 0;
        text-align: center;
    }
</style>

