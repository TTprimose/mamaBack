<template>
    <div>
        <div class="model_topcol">
            <span style="color: #409EFF">招聘列表</span>
            <span> - 添加招聘信息</span>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-form ref="myForm" class="myForm" :inline="true" :model="addFormData" :rules="rules" label-position="right" size="small" label-width="140px">
                    <div class="baseInfoBox">
                        <el-form-item prop="position" label="岗位名称">
                            <el-input v-model="addFormData.position"></el-input>
                        </el-form-item>
                    </div>

                    <div class="baseInfoBox">
                        <el-form-item label="部门" prop='departmentId'>
                            <el-select v-model="addFormData.departmentId" placeholder="请选择">
                                <el-option
                                    v-for="item in options"
                                    :key="item.id"
                                    :label="item.departmentName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="baseInfoBox ediotrBox" >
                        <el-form-item label="内容">
                            <div id='editorE'></div>
                        </el-form-item>
                    </div>

                    <div class="baseInfoBox">
                        <el-form-item label="状态" prop='status'>
                            <el-select v-model="addFormData.status" placeholder="请选择">
                                <el-option
                                    v-for="item in optionsState"
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
                    <div style="height:500px"></div>

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
import api from 'api/recruit'
export default {
    components: {
    },
    data(){
        return {
            recruitId:'',
            addFormData: {
                position: null,
                departmentId:null,
                content:null,
                status:null,
                sort:null,
                releaseTime:null
            },
            options:[],
            optionsState:[
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
                position: [
                    { required: true, message: '请输入岗位名称', trigger: 'blur' }
                ],
                departmentId:[
                    { required: true, message: '请选择部门', trigger: 'blur' }
                ]
            }

        }
    },
    computed:{

    },
    methods:{
        info(){
            console.log(this.addFormData)
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
                    // console.log(this.addFormData)
                    if (typeof(this.recruitId) != 'undefined'){

                        if (typeof(this.addFormData.releaseTime) != 'number'){
                            this.addFormData.releaseTime = Date.parse(this.addFormData.releaseTime) / 1000
                        } else {
                            this.addFormData.releaseTime = this.addFormData.releaseTime / 1000
                        }
                        api.putjoinupdate(this.addFormData).then(() => {
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

                        api.postjoinadd(this.addFormData).then((response) => {
                            this.$message({
                                message: '新增成功',
                                type: 'success'
                            });
                            this.$router.go(-1)
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

            formData.append('uploadType', 'erp')

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
        this.addFormData.releaseTime = new Date()
        this.recruitId = this.$route.params.id
        api.getdepartmentlist().then((response) => {
            // console.log(response)
            this.options = response.data.list
        })
        if (typeof(this.recruitId) != 'undefined'){
            api.getjoinid(this.recruitId).then((res) => {
                this.addFormData = res.data
                this.editor.txt.html(res.data.content)
                this.addFormData.releaseTime = new Date(this.addFormData.releaseTime * 1000)
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
