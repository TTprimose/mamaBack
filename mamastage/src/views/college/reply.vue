<template>
    <div>
        <div class="model_topcol">
            <span>学员反馈</span>
            <div>
                <el-button type="primary" @click="inAddEvent" size="small">添加学员反馈</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">
                    <el-input
                        size="small"
                        placeholder="请输入学员姓名搜索"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        @keyup.enter.native='search'
                        clearable
                        @change="clearSearchStr"
                        v-model="searchFormData.name">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 83"
                    ref="purchaseListTable"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="学员姓名"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="picUrl"
                        label="照片">
                        <template slot-scope="scope">
                            <img :src="scope.row.picUrl" style="max-width: 240px;max-height: 100px">
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="content"
                        label="内容"
                        width="600">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status == 1">关闭</span>
                            <span v-if="scope.row.status == 0">开启</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="editTable(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                修改
                            </el-button>
                            <el-button
                                @click.native.prevent="deleteTable(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" class="Dialog">
            <el-form :model="form" :rules="ruleForm" label-position="right" label-width="85px" class="myForm">
                <el-form-item label="学员名称:" prop="name">
                    <el-input v-model="form.name" placeholder="请输入学员名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="照片:" prop="picUrl">
                    <el-upload
                        :action="upDateImgUrl"
                        :data='imgData'
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :file-list="fileList"
                        :before-upload="beforeAvatarUpload"
                        multiple
                        :on-exceed="handleLimit"
                        :limit="1">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <span style="color:#999">建议图片比例 1:1，大小不超过 1M</span>
                    <el-dialog :visible.sync="dialogVisible" append-to-body>
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <span></span>
                </el-form-item>
                <el-form-item label="状态:">
                    <el-select v-model="form.status" placeholder="请选择" size="small">
                        <el-option label="开启" value="0">
                        </el-option>
                        <el-option label="关闭" value="1">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容:" prop="content">
                    <el-input v-model="form.content" type="textarea" :maxlength="200" rows="4" placeholder="请输入内容不得超过200字"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm" size="small">确 定</el-button>
            </div>
        </el-dialog>
        <div class="model_footer">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[15, 30, 50, 100]"
                :page-size="15"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import API from 'api/college'
export default {
    data(){
        return {
            upDateImgUrl: process.env.API_ROOT + '/f/upload',
            imgData: {
                file: '',
                uploadType: 'www_cms'
            },
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            userInfo: {},
            currentPage: 1,
            total: 0,
            flagStatus: 0,
            selectTableData: [],
            searchFormData: {
                pageNo: null,
                pageSize: null,
                name: null
            },
            postData: {},
            tableData: [
                {
                    audiStatus: '',
                    title: '',
                    sort: '',
                    time: ''
                }
            ],

            dialogTitle: '',
            form: {
                name: '',
                id: '',
                status: 0
            },
            ruleForm: {
                picUrl: [
                    { required: true, message: '请选择图片', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            },
            dialogFormVisible: false
        }
    },
    computed:{},
    methods:{
        handleSizeChange(data){
            this.currentPage = 1
            this.searchFormData.pageNo = this.currentPage
            this.searchFormData.pageSize = data
            this.getTableData(this.searchFormData)
        },
        handleCurrentChange(data){
            this.searchFormData.pageNo = data
            this.getTableData(this.searchFormData)
        },
        clearSearchStr() {
            this.getTableData(this.searchFormData)
        },
        // 获取列表数据
        getTableData(data) {
            API.getFeedbackList(data).then((res) => {
                this.tableData = res.data.list
                this.total = res.data.total
            })
        },
        // 跳转详情页
        enterTable(index, data) {

        },
        // 修改
        editTable(index, data) {
            this.fileList = []
            this.dialogFormVisible = true
            this.flagStatus = 1
            this.dialogTitle = '修改学员反馈'
            this.form.name = data.name
            this.form.content = data.content
            this.form.status = data.status == 1 ? '关闭' : '开启'
            this.form.id = data.id
            let object = {
                status: '',
                uid: '',
                url: data.picUrl
            }

            this.fileList.push(object)
        },
        // 删除
        deleteTable(index, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.delFeedback(data.id).then((res) => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        this.getTableData()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },
        dialogConfirm() {
            let arrUrl = []

            this.postData = JSON.parse(JSON.stringify(this.form))
            this.postData.status = this.postData.status == '开启' || this.postData.status == 0 ? 0 : 1
            this.dialogFormVisible = false
            this.fileList.forEach((file) => {
                if (file.response) {
                    arrUrl.push(file.response.data.url)
                } else {
                    arrUrl.push(file.url)
                }
            })
            this.postData.picUrl = arrUrl.join(',')
            if (this.flagStatus == 0) {
                // 新增
                console.log(this.postData)
                API.addFeedback(this.postData).then((res) => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '添加成功！'
                        })
                        this.getTableData()
                    }
                })
            } else if (this.flagStatus == 1) {
                // 编辑
                API.editFeedback(this.postData).then((res) => {
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
        // 搜索
        search() {
            this.getTableData(this.searchFormData)
        },
        inAddEvent(){
            this.flagStatus = 0
            this.dialogFormVisible = true
            for (let key in this.form) {
                this.form[key] = null
            }
            this.fileList = []
            this.dialogTitle = '添加学员反馈'
        },
        // 上传图片成功
        handleAvatarSuccess(res, file, fileList) {
            this.fileList = fileList
        },
        // 移除图片
        handleRemove(file, fileList) {
            this.fileList = fileList
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
        }
    },
    created(){},
    mounted(){

    },
    activated() {
        this.currentPage = 1
        this.getTableData()
        this.userInfo = localStorage.getItem('userInfo')
    }
}
</script>


<style scoped>
    .purchaseList_title{
        height: 63px;
        line-height: 63px;
        padding-left: 17px;
    }
    .purchaseList_exportWrap{
        height: 63px;
        padding-top: 15px;
    }
    .purchaseList_title span{
        cursor: pointer;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
        font-size: 12px;
    }
    .purchaseList_exportWrap>ul{
        overflow: hidden;
        padding-left: 0;
    }
    .purchaseList_exportWrap>ul>li{
        float: left;
        padding: 0 20px;
        height: 33px;
        line-height: 32px;
    }
    .box_card{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 300px;
        z-index: 9;
    }
    .model_content_inner{
        position: relative;
    }
    .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
        width: 390px;
    }
    .el-form, .el-table{
        color: #636365;
    }
    .el-table .cell .auditStatus_0, .el-table .cell .auditStatus_1{
        color: #e6a23c;
    }
    .el-table .cell .auditStatus_2{
        color: #606266;
    }
    .el-table .cell .auditStatus_3{
        color: #f56c6c;
    }


</style>
