<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">新闻</span>
            <span> - 添加新闻</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-form ref="myForm" class="myForm" :inline="true" :model="addFormData" :rules="rules" label-position="right" size="small" label-width="140px">
                    <div class="baseInfoBox">
                        <el-form-item prop="title" label="标题">
                            <el-input v-model="addFormData.title" class="titleT"></el-input>
                        </el-form-item>

                    </div>
                    <div class="baseInfoBox" >
                        <el-form-item label="图片" required>
                            <div class="pic_up">
                                <el-upload
                                    :action="upDateImgUrl"
                                    :data='sentData'
                                    :file-list='fileList'
                                    multiple
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreview"
                                    :on-remove="handleRemove"
                                    :before-upload="beforeAvatarUpload"
                                    :on-success='handleAvatarSuccess'>
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <!-- action上传地址 -->
                                <el-dialog :visible.sync="dialogVisible">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                </el-dialog>
                            </div>
                            <span style="color:#999">建议图片比例 16：10 ，大小不超过 1M</span>
                        </el-form-item>
                    </div>

                    <el-form-item  label="文章来源">
                        <el-input v-model="addFormData.source" placeholder="妈妈去哪儿"></el-input>
                        <span style="color:#999">文章来源默认为“妈妈去哪儿”，用户可更改</span>
                    </el-form-item>

                    <!-- 上传视频 -->
                    <div class="baseInfoBox" >
                        <el-form-item label="视频">
                            <div class="pic_up" id='videoT'>
                                <el-upload
                                    :action="upDateImgUrl"
                                    :data='sentData'
                                    :file-list='fileListT'
                                    multiple
                                    list-type="picture-card"
                                    :on-preview="handlePictureCardPreviewT"
                                    :on-remove="handleRemoveT"
                                    :on-success='handleAvatarSuccessT'>
                                    上传视频
                                </el-upload>
                                <el-button type="primary" size="small" @click="addVidoeToC">添加视频至内容</el-button>
                                <span style="color:#999">大小不超过 100M</span>
                                <!-- action上传地址 -->
                                <el-dialog :visible.sync="dialogVisibleT">
                                    <img width="100%" :src="dialogImageUrlT" alt="">
                                </el-dialog>
                            </div>
                        </el-form-item>
                    </div>

                    <div class="baseInfoBox ediotrBox">
                        <el-form-item label="内容">
                            <div id='editorE'></div>
                        </el-form-item>
                    </div>

                    <!--<el-form-item  label="跳转链接">-->
                        <!--<el-input v-model="addFormData.jumpUrl" ></el-input>-->
                        <!--<span>可输入文章外部跳转链接</span>-->
                    <!--</el-form-item>-->

                    <div class="baseInfoBox">
                        <el-form-item label="状态">
                            <el-select v-model="addFormData.status" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="baseInfoBox">
                        <el-form-item label="排序">
                            <el-input v-model="addFormData.sort" placeholder="数字越大排名越靠前"></el-input>
                        </el-form-item>
                    </div>

                    <div class="baseInfoBox">
                        <el-form-item label="发布时间">
                            <el-date-picker
                                v-model="addFormData.releaseTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="timestamp">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div style="height:100px"></div>

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
import axios from 'axios'
import api from 'api/news'
export default {
    components: {
    },
    data(){
        return {
            newsId:'',
            addFormData: {
                title: null,
                picUrl:[],
                source:'妈妈去哪儿',
                video:'http://img95.699pic.com/video_cover/86/08/33/qBI76TJ5YZAb1529860833.jpg!/fw/850',
                content:'',
                jumpUrl:'',
                status:'',
                sort:'',
                releaseTime:''
            },
            options:[
                {
                    value:0,
                    label:'开启'
                },
                {
                    value:1,
                    label:'关闭'
                }
            ],
            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'blur' }
                ]
            },
            // 图片上传
            sentData: {
                file: '',
                uploadType: 'www_cms'
            },
            fileList:[],
            upDateImgUrl: process.env.API_ROOT + '/f/upload',
            dialogImageUrl:'',
            dialogVisible:false,

            fileListT:[],
            dialogImageUrlT:'',
            dialogVisibleT:false

        }
    },
    computed:{

    },
    methods:{
        info(){
            console.log(this.addFormData)
        },
        // 图片
        // 变大查看
        handlePictureCardPreview(file, fileList) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file, fileList) {
            this.fileList = JSON.parse(JSON.stringify(fileList))
        },
        // 成功回调
        handleAvatarSuccess(file, fileList) {
            this.fileList.push(fileList.response.data)
        },

        // 视频
        handlePictureCardPreviewT(file, fileList) {
            this.dialogImageUrlT = file.url;
            this.dialogVisibleT = true;
        },
        handleRemoveT(file, fileList) {
            this.fileListT = JSON.parse(JSON.stringify(fileList))
        },
        // 成功回调
        handleAvatarSuccessT(file, fileList) {
            this.fileListT.push(fileList.response.data)
        },
        // 检测图片大小
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 1

            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 1MB!');
            }
            return isLt2M;
        },
        addVidoeToC() {
            let html = ''

            if (this.fileListT.length == 0) {
                this.$message({
                    message: '请选择视频',
                    type: 'warning'
                });
                return
            }
            this.fileListT.forEach((file) => {
                if (file.response) {
                    html += '<video src=' + file.response.data.url + ' autoplay="autoplay" controls="controls" style="margin: 10px auto;display: block;width: 100%"></video><p><br></p>'
                } else {
                    html += '<video src=' + file.url + ' autoplay="autoplay" controls="controls" style="margin: 10px auto;display: block;width: 100%"></video><p><br></p>'
                }
            })
            this.editor.txt.append(html)
            this.addFormData.content += html
        },
        clearAll() {
            for (let key in this.addFormData) {
                this.addFormData[key] = null
            }

            this.editor.txt.clear()
        },

        // 保存
        save() {
            this.$refs['myForm'].validate((valid) => {
                if (valid) {
                    let arr = []

                    for (let i in this.fileList){
                        arr.push(this.fileList[i].url)
                    }

                    this.addFormData.picUrl = arr.join(',')

                    let arrT = []

                    for (let i in this.fileListT){
                        arrT.push(this.fileListT[i].url)
                    }
                    this.addFormData.video = arrT.join(',')

                    if (typeof(this.newsId) != 'undefined'){
                        if (typeof(this.addFormData.releaseTime) != 'number'){
                            this.addFormData.releaseTime = Date.parse(this.addFormData.releaseTime) / 1000
                        } else {
                            this.addFormData.releaseTime = this.addFormData.releaseTime / 1000
                        }

                        api.putnewsupdate(this.addFormData).then(() => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.go(-1)
                        })
                    } else {
                        if (typeof(this.addFormData.releaseTime) != 'number'){
                            this.addFormData.releaseTime = Date.parse(this.addFormData.releaseTime) / 1000
                        } else {
                            this.addFormData.releaseTime = this.addFormData.releaseTime / 1000
                        }

                        api.postnewsadd(this.addFormData).then((res) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$router.go(-1)
                        }).catch((errpr) => {
                            this.$message({
                                message: errpr.data.data.message,
                                type: 'warning'
                            })
                            this.addFormData.releaseTime = new Date()
                        })
                    }

                }
            })

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
            this.addFormData.content = html
        }
        this.editor.create()

        $('.w-e-text-container').height(500)
        $('.w-e-text-container').width(1000)

    },
    activated() {
        this.clearAll()
        this.fileList = []
        this.fileListT = []
        this.addFormData.releaseTime = new Date()
        this.newsId = this.$route.params.id
        this.addFormData.source = '妈妈去哪儿'

        if (typeof(this.newsId) != 'undefined'){
            api.getnewsid(this.newsId).then((response) => {
                this.addFormData = response.data
                let arr = response.data.picUrl.split(',')

                arr.forEach((obj) => {
                    let object = {
                        status: '',
                        uid: '',
                        url: obj
                    }

                    this.fileList.push(object)
                })

                if (response.data.video != ''){
                    let arrT = response.data.video.split(',')

                    arrT.forEach((obj) => {
                        let object = {
                            status: '',
                            uid: '',
                            url: obj
                        }

                        this.fileListT.push(object)
                    })
                }


                this.addFormData.releaseTime = new Date(this.addFormData.releaseTime * 1000)
                this.editor.txt.html(this.addFormData.content)
            })
        }
        this.$refs['myForm'].resetFields();

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
    .el-icon-more{
        cursor: pointer;
    }
    .el-date-editor{
        width: 194px;
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
    .goodInfoBox{
        width: 100%;
        margin-top: 20px;
    }
    .goodInfoBox .el-form-item{
        width: 400px;
    }
    .addRemark{
        cursor: pointer;
    }
</style>
