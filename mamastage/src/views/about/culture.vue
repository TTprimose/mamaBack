<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">关于</span>
            <span> - 企业文化</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-form ref="myForm" class="myForm" :inline="true" :model="addFormData" :rules="rules" label-position="right" label-width="140px">
                    <div class="baseInfoBox">
                        <el-form-item label="栏目：">
                            <span style="font-size: 14px;font-weight: bold">企业文化</span>
                        </el-form-item>
                    </div>
                    <div class="baseInfoBox oteherB">
                        <el-form-item label="图片：">
                            <el-upload
                                :action="upDateImgUrl"
                                :data='imgData'
                                :on-success="handleAvatarSuccess"
                                :on-remove="handleRemove"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :before-upload="beforeAvatarUpload"
                                :file-list="fileList"
                                multiple
                                :on-exceed="handleLimit">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <span style="color:#999">建议图片比例 16：10，大小不超过 1M</span>
                            <el-dialog :visible.sync="dialogVisible" append-to-body>
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </el-form-item>

                    </div>
                    <div class="baseInfoBox">
                        <el-form-item label="内容：">
                            <div id='editorE_culture' style="max-height:1000px;width: 850px"></div>
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
            upDateImgUrl: process.env.API_ROOT + '/f/upload',
            imgData: {
                file: '',
                uploadType: 'www_cms'
            },
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            editor: '',
            addFormData: {
                releaseTime: '',
                id: '',
                column: '',
                content: '',
                picUrl: ''
            },
            rules: {
                pic: [
                    { required: true, message: '请选择图片', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        createEditor() {
            this.editor = new E('#editorE_culture')
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
        // 上传图片成功
        handleAvatarSuccess(res, file, fileList) {
            this.fileList = fileList
            if (this.fileList.length > 8){
                $('.oteherB .el-form-item__content').css({'padding-right':'50px', 'padding-left':'140px'})
            }
        },
        // 移除图片
        handleRemove(file, fileList) {
            this.fileList = fileList
            if (this.fileList.length < 8){
                $('.oteherB .el-form-item__content').css('padding', '0')
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true

        },
        handleLimit() {

        },
        // 检测图片大小
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 1

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 1MB!');
            }
            return isLt2M;
        },
        getTableData() {
            api.getCulture().then((res) => {
                this.editor.txt.html(res.data.content)
                this.addFormData.id = res.data.id
                this.addFormData.content = res.data.content
                this.addFormData.column = '企业文化'
                this.fileList = []
                let arr = res.data.picUrl.split(',')

                arr.forEach((obj) => {
                    let object = {
                        status: '',
                        uid: '',
                        url: obj
                    }

                    this.fileList.push(object)
                })
                if (this.fileList.length > 8){
                    $('.oteherB .el-form-item__content').css({'padding-right':'50px', 'padding-left':'140px'})
                }
            })
        },
        save() {
            this.postData = JSON.parse(JSON.stringify(this.addFormData))
            this.postData.releaseTime = Date.parse(this.addFormData.releaseTime) / 1000
            let arrUrl = []

            this.fileList.forEach((file) => {
                if (file.response) {
                    arrUrl.push(file.response.data.url)
                } else {
                    arrUrl.push(file.url)
                }
            })
            this.postData.picUrl = arrUrl.join(',')
            api.editCulture(this.postData).then((res) => {
                if (res.result == 1) {
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    })
                    this.getTableData()
                }
            })
        }
    },
    mounted() {
        this.createEditor()
        this.addFormData.releaseTime = new Date()
        this.getTableData()
    }
}
</script>

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
