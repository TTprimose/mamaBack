<template>
    <div>
        <div class="model_topcol">
            <span>发展历程</span>
            <div>
                <el-button type="primary" @click="inAddEvent" size="small">添加发展历程</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">
                    <el-date-picker
                        v-model="searchTime"
                        type="month"
                        placeholder="请选择日期"
                        @change="search"
                        size="small">
                    </el-date-picker>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 83"
                    ref="purchaseListTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        prop="time"
                        label="日期"
                        width="150"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.time | time_month}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="event"
                        label="事件"
                    >
                        <template slot-scope="scope">
                            <div class="compileDiv" v-html="scope.row.event"></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="releaseTime"
                        label="添加时间"
                        width="200">
                        <template slot-scope="scope">
                            <span>{{scope.row.releaseTime | time_m}}</span>
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
        <el-dialog append-to-body :title="dialogTitle" :visible.sync="dialogFormVisible" class="Dialog">
            <el-form :model="form" label-position="right" label-width="80px">
                <el-form-item label="日期:">
                    <el-date-picker
                        v-model="form.time"
                        type="month"
                        placeholder="请选择日期"
                        size="small">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="事件:">
                    <div id='editorE_dev' style="height:350px"></div>
                </el-form-item>
                <el-form-item label="发布时间:">
                    <el-date-picker
                        v-model="form.releaseTime"
                        type="datetime"
                        placeholder="选择日期"
                        size="small">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog" size="small">取 消</el-button>
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
import API from 'api/about'
import E from 'wangeditor'
import axios from 'axios'
export default {
    data(){
        return {
            editor: '',
            userInfo: {},
            currentPage: 1,
            total: 0,
            selectTableData: [],
            searchFormData: {
                pageNo: null,
                pageSize: null,
                time: null
            },
            searchTime:'',
            postData: {},
            flagStatus: 0, // 0代表新增，1代表修改
            tableData: [
                {
                    event: '',
                    id: '',
                    releaseTime: '',
                    time: ''
                }
            ],

            dialogTitle: '',
            form: {
                event: '',
                time: '',
                releaseTime: '',
                id: null
            },
            dialogFormVisible: false,
            numFlag: 0
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
            API.getDevelopList(data).then((res) => {
                this.tableData = res.data.list
                this.total = res.data.total
            })
        },
        createEditor() {
            let that = this

            this.$nextTick(function () {
                that.editor = new E('#editorE_dev')
                that.editor.customConfig.customUploadImg = function(files, insert) {
                    let formData = new FormData()

                    formData.append('uploadType', 'www_cms')

                    formData.append('file', files[0])

                    axios.post('/f/upload', formData).then(res => {
                        insert(res.data.data.url)
                    })
                }
                that.editor.customConfig.onchange = (html) => {
                    that.form.event = html
                    // console.log(html, 1)
                }
                that.editor.create()
            })
        },

        // 跳转详情页
        enterTable(index, data) {

        },
        // 修改
        editTable(index, data) {
            let that = this

            this.dialogFormVisible = true
            if (this.numFlag == 0) {
                this.createEditor()
                this.numFlag += 1
            }
            this.flagStatus = 1
            this.dialogTitle = '修改发展历程'
            this.form.releaseTime = new Date()
            this.form.time = parseInt(data.time, 10) * 1000
            setTimeout(()=> {
                that.editor.txt.html(data.event)
                // console.log(that.editor)
            }, 10)
            this.form.event = data.event
            this.form.id = data.id
            // console.log(data)
        },
        // 删除
        deleteTable(index, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                API.deleteDevelop(data.id).then((res) => {
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
            this.dialogFormVisible = false
            this.postData = JSON.parse(JSON.stringify(this.form))
            if (isNaN(this.postData.time)) {
                this.postData.time = Date.parse(this.postData.time) / 1000
            } else {
                this.postData.time = this.postData.time / 1000
            }
            this.postData.releaseTime = Date.parse(this.form.releaseTime) / 1000
            // this.postData.time
            // console.log(this.postData, '传递的消息')
            if (this.flagStatus == 0) {
                // 新增发展历程
                API.addDevelop(this.postData).then((res) => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '新增成功！'
                        })
                        this.getTableData()
                    }
                })

            } else {
                // 修改发展历程
                API.editDevelop(this.postData).then((res) => {
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
        // 点击取消
        closeDialog() {
            this.dialogFormVisible = false
        },
        // 搜索
        search() {
            this.searchFormData.time = Date.parse(this.searchTime) / 1000
            if (isNaN(this.searchFormData.time) == true){
                this.searchFormData.time = null
                this.getTableData(this.searchFormData)
            } else {
                this.getTableData(this.searchFormData)
            }

        },
        // 搜索选中后
        handleSelect(item) {
            console.log(item);
        },
        handleSelectionChange(val){

        },
        inAddEvent(){
            this.dialogFormVisible = true
            if (this.numFlag == 0) {
                this.createEditor()
                this.numFlag += 1
            }
            this.flagStatus = 0
            for (let key in this.form) {
                this.form[key] = null
            }
            this.form.releaseTime = new Date()
            this.dialogTitle = '添加发展历程'
            this.editor.txt.clear()
        }
    },
    created(){},
    mounted(){
        // this.createEditor()
    },
    activated() {
        this.currentPage = 1
        this.getTableData()
        this.userInfo = localStorage.getItem('userInfo')
    }
}
</script>
<style>
    .compileDiv{font-size: 12px}
    .compileDiv h1,.compileDiv h2,.compileDiv h3,.compileDiv h4{margin: 0;}
</style>

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
