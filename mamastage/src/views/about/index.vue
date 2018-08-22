<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">关于</span>
            <span> - 关于我们</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-form ref="myForm" class="myForm" :inline="true" :model="addFormData" :rules="rules" label-position="right" label-width="140px">
                    <div class="baseInfoBox">
                        <el-form-item label="栏目：">
                            <span style="font-size: 14px;font-weight: bold">关于我们</span>
                        </el-form-item>
                    </div>
                    <div class="baseInfoBox">
                        <el-form-item label="内容：">
                            <div id='editorE_index' style="max-height:1000px;width: 850px"></div>
                        </el-form-item>
                    </div>
                    <div class="baseInfoBox">
                        <el-form-item label="发布时间：">
                            <el-date-picker
                                v-model="addFormData.releaseTime"
                                type="datetime"
                                placeholder="选择日期"
                                size="small">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="model_footer">
            <el-button style="width: 90px" type="primary" size="small" @click="save">保存</el-button>
            <el-button style="width: 90px" size="small" v-RouterBack>取消</el-button>
        </div>
    </div>
</template>

<script>
import E from 'wangeditor'
import api from 'api/about'
import axios from 'axios'
export default {
    data () {
        return {
            editor: '',
            addFormData: {
                releaseTime: '',
                id: '',
                column: '',
                content: ''
            },
            postData: {},
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 获取列表信息
        getAboutList() {
            api.getAboutList().then((res) => {
                this.editor.txt.html(res.data.content)
                this.addFormData.id = res.data.id
                this.addFormData.column = '关于我们'
            })
        },
        createEditor() {
            this.editor = new E('#editorE_index')
            this.editor.customConfig.customUploadImg = function(files, insert) {
                let formData = new FormData()

                formData.append('uploadType', 'www_cms')

                formData.append('file', files[0])

                axios.post('/f/upload', formData).then(res => {
                    insert(res.data.data.url)
                    // console.log(res.data.data.url)
                })


            }
            this.editor.customConfig.onchange = (html) => {
                this.addFormData.content = html
                // console.log(html, 1)
            }
            this.editor.create()
        },
        save() {
            this.postData = JSON.parse(JSON.stringify(this.addFormData))
            this.postData.releaseTime = Date.parse(this.addFormData.releaseTime) / 1000
            api.editAbout(this.postData).then((res) => {
                if (res.result == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    })
                }
            })

        }
    },
    mounted() {
        this.createEditor()
        this.getAboutList()
    },
    activated() {
        this.addFormData.releaseTime = new Date()
    }
}
</script>
<style>
    .el-picker-panel{z-index: 100001!important;}
</style>
<style scoped>
    .banner{
        height: 40px;
        background: #f5f5f5;
        line-height: 40px;
        color: #606266;
        font-weight: 600;
        padding-left: 10px;
    }
    .baseInfoBox{
        padding-top: 10px;
    }
    .model_footer{
        line-height: 50px;
        text-align: left;
        padding-left: 40px;
    }
    .content{
        overflow: auto;
        background: #FFFFFF;
    }
</style>
