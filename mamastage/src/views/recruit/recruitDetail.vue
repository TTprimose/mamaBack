<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">招聘列表</span>
            <span> - 招聘详情</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}" style="background:white">
                <div class="textTitle">
                    <h3>{{recruitDetailForm.position}}</h3>
                    <div class="titleSmall">
                        <p>发布时间：{{recruitDetailForm.releaseTime | time_s}}</p>
                    </div>
                </div>
                <div class="caseContent">
                    <div id='editorE'></div>
                </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button style="width: 90px" size="small" v-RouterBack>返回列表</el-button>
        </div>
    </div>
</template>

<script>
import api from 'api/recruit'

import E from 'wangeditor'
import axios from 'axios'
export default {
    components: {
    },
    data(){
        return {
            recruitId:'',
            recruitDetailForm:{}
        }
    },
    computed:{

    },
    methods:{
        get() {

        },
        clearAll() {
            for (let key in this.addFormData) {
                this.addFormData[key] = null
            }
        }
    },
    created(){},
    mounted(){
        this.editor = new E('#editorE')
        this.editor.customConfig.customUploadImg = function(files, insert) {
            let formData = new FormData()

            formData.append('uploadType', 'www_cms')

            formData.append('file', files[0])

            axios.post('/f/upload', formData).then(res => {
                insert(res.data.data.url)

            })

        }
        this.editor.customConfig.onchange = (html) => {
            this.recruitDetailForm.content = html
        }
        this.editor.create()

        $('.w-e-text-container').height(600)
    },
    activated() {
        this.clearAll()
        this.recruitId = this.$route.params.id
        api.getjoinid(this.recruitId).then((response) => {
            this.recruitDetailForm = response.data
            this.editor.txt.html(response.data.content)
        })
    }
}
</script>

<style scoped>
    .model_footer{
        line-height: 50px;
        text-align: left;
        padding-left: 40px;
    }
    .textTitle{
        text-align: center;
        width: 70%;
        margin: auto;
        height: 130px;
        line-height: 60px;
        border-bottom: 1px dashed #ccc
    }
    .textTitle h3{
        margin: 0;
        padding-top:40px;
    }
    .titleSmall{
        width: 50%;
        margin: auto;
        color: #999;
        text-align: center
    }
    .caseContent{
        width: 70%;
        margin: auto;
        padding: 30px 0;
    }
</style>
