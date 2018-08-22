<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">案例</span>
            <span> - 案例详情</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}" style="background:white;overflow:auto">
                <div class="textTitle">
                    <h3>{{caseDeadilForm.title}}</h3>
                    <div class="titleSmall">
                        <p>来源：{{caseDeadilForm.source}}</p>
                        <p>发布时间：{{caseDeadilForm.releaseTime | time_s}}</p>
                    </div>
                </div>
                <div class="caseContent">
                    <div id='editorE'></div>
                </div>
                <div class="caseContent">
                    <img :src="caseDeadilForm.picUrl" alt="">
                </div>
            </div>
        </div>
        <div class="model_footer">
            <el-button style="width: 90px" size="small" v-RouterBack>返回列表</el-button>
        </div>
    </div>
</template>

<script>
import api from 'api/case'

import E from 'wangeditor'
import axios from 'axios'
export default {
    components: {
    },
    data(){
        return {
            caseId:'',
            caseDeadilForm:{}
        }
    },
    computed:{

    },
    methods:{
        get() {

        },
        clearAll() {
            for (let key in this.caseDeadilForm) {
                this.caseDeadilForm[key] = null
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
        this.caseId = this.$route.params.id

        api.getcaseid(this.caseId).then((response) => {
            // console.log(response)
            this.caseDeadilForm = response.data
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
        display: flex;
        justify-content: space-between;
        margin: auto;
        color: #999
    }
    .caseContent{
        width: 70%;
        margin: auto;
        padding: 30px 0;
    }
</style>
