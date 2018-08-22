<template>
  <div class="slider">
      <div class="silder_left">
        <div class="slider_logo">
            <img src="../../../static/img/logo.png" alt="妈妈去哪儿">
        </div>
        <ul id="firstMenu_ul">
          <li @click="firstMenuClickEvent($event)" v-for="(item, index) in menuList" :key="item.name" :text="item.text" :type="item.name" :class="[item.icon, index == 0 ? 'active' : '']" v-text="item.text"></li>
        </ul>
          <el-popover
              placement="bottom"
              v-model="popoverisShow"
              width="127"
              trigger="click"
              :style="{textAlign: 'center'}"
          >
              <!--<div @click="editPasswordEvent" class="dropdown">-->
                  <!--修改密码-->
              <!--</div>-->
              <div @click="loginOutEvent" class="dropdown">
                  退出系统
              </div>
              <div slot="reference" class="userInfoWrap">
                  <div style="color: #E0E0DE; padding-top: 17px; text-align: center; cursor: pointer">
                      <div style="background: #f5f5f5; width: 24px; height: 24px; border-radius: 50%;display: inline-block">
                          <img src="../../../static/img/login/adm.png" alt="头像">
                      </div>
                      <br>
                      <span>{{myBase.splitUserName($store.state.home.userInfo.user.userName)}}</span>
                      <span :class="[popoverisShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']"></span>
                  </div>
              </div>
          </el-popover>
      </div>
      <div v-show="$store.state.home.isNextMenuShow" class="silder_right">
        <div class="silder_right_top">
          <h4 :style="{textAlign: 'center', margin: '0', padding: '0', lineHeight: '45px', color: '#313131'}" v-text="nextMenuTitle"></h4>
        </div>
        <ul id="secondMenu_ul">
          <li @click="secondMenuClickEvent($event)" v-for="(item, index) in nextMenuList" :class="[index == 0 ? 'active' : '']" :routerUrl="item.path" :key="item.path" v-text="item.name"></li>
        </ul>
      </div>
  </div>
</template>

<script>
import api from 'api/case'
export default {
    name: "slider",
    props: ["menuList"],
    data() {
        return {
            nextMenuList: [],
            nextMenuMap:{},
            popoverisShow: false,
            nextMenuTitle: '商品'
        };
    },
    computed: {},
    methods: {
        firstMenuClickEvent($event){
            $('#firstMenu_ul>li').removeClass('active')
            var tha = $event.currentTarget
            var type = $(tha).attr('type')
            var text = $(tha).attr('text')
            var pathUrl = type == 'case' ? '/caseList' : 'newsList'

            $(tha).addClass('active')
            if (type == 'case' || type == 'news'){
                this.$store.commit('setNextMenuShow', false)
                this.$router.push({
                    path: pathUrl
                });
                return
            } else {
                this.$store.commit('setNextMenuShow', true)
            }
            this.nextMenuList = this.nextMenuMap[type]
            this.nextMenuTitle = text

            this.$router.push({
                path: this.nextMenuList[0].path
            });


        },
        secondMenuClickEvent($event){
            $('#secondMenu_ul>li').removeClass('active')
            var tha = $event.currentTarget
            var path = $(tha).attr('routerUrl')

            $(tha).addClass('active')
            this.$router.push({
                path: path
            });

        },
        editPasswordEvent(){
            this.$router.push({
                path: '/editPassword'
            })
        },
        loginOutEvent() {
            api.getuserlogout().then((Response) => {
                this.$message({
                    message: '退出登录',
                    type: 'success'
                });
                this.$router.push({
                    path: '/login'
                })
                sessionStorage.clear()
            }).catch((error) => {
                console.log(error)
            })

        }
    },
    created() {
        this.nextMenuMap = this.$store.state.home.nextMenuMap
    }
};

</script>
<style scoped>
  .slider{
    height: 100%;
    float: left;
  }
  .slider_logo{
      text-align: center;
      width: 100%;
      height: 90px;
      line-height: 90px;

  }
  .silder_left {
    width: 90px;
    height: 100%;
    background: #2c303c;
    float: left;
    box-sizing: border-box;
    position: relative;
  }
  .silder_left .active{
    background: #f5f5f5;
    color: #313131
  }
  .silder_left li{
    text-align: center;
    color: #dcdedc;
    width: 100%;
    padding: 10px 0px;
    margin: 10px 0;
    cursor: pointer;
  }
  .silder_right {
    width: 110px;
    height: 100%;
    background: #ffffff;
    float: right;
    border: 1px solid #e4e8eb;
    color: #636365;
    box-sizing: border-box;
    border-bottom: none;
  }
  .silder_right_top{
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e4e8eb;
  }
  .silder_right li{
    width: 90px;
    text-align: center;
    box-sizing: border-box;
    padding: 7px 0;
    margin: 13px 0 13px 0;
    margin-left: 7px;
    border-radius: 3px;
    cursor: pointer;
  }
  .silder_right li:hover{
      color: #409EFF
  }
  .silder_right .active{
    border: 1px solid #f4f4f4;
    background: #f5f5f5
  }
  ul{
    list-style: none;
    text-align: center;
    padding: 0
  }
  .silder_left ::before{
      margin-right: 10px;
  }
  .userInfoWrap{
      width: 100%;
      height: 75px;
      background: #374455;
      position: absolute;
      bottom: 0;
  }
  .el-popover{
      min-width: 100px;
  }
  .dropdown{
      text-align: center;
      margin: 5px 0;
      padding: 5px 0;
      cursor: pointer;
  }
  .dropdown:hover{
      background: #ECF5FF;
      color: #66B1FF;
  }
</style>
