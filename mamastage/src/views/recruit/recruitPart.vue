<template>
    <div>
        <div class="model_topcol">
            <span>招聘部门</span>
            <div>
                <el-button type="primary"  @click="addrecuitPartA" size="small">添加招聘部门</el-button>
            </div>

            <el-dialog
                title="添加招聘部门"
                :visible.sync="dialogVisible"
                width="30%">

                <div>
                    <span>部门名称：</span>
                    <el-input  size="small" placeholder="请输入部门名称" clearable v-model="addrecuitPart" :style="{width: '250px'}"></el-input>
                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addrecuitPartFalse" size="small">取 消</el-button>
                    <el-button type="primary" @click="addrecuitPartTrue" size="small">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">

                    <el-input
                        size="small"
                        placeholder="请输入部门名称"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        @keyup.enter.native='search'
                        clearable
                        @change="clearSearchStr"
                        v-model="searchFormData.departmentName ">
                    </el-input>
                    <el-button :style="{margin: '0 10px'}" type="primary" size="small" @click="search">搜索</el-button>
                </div>
                <el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 83"
                    ref="purchaseListTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        prop="departmentName"
                        label="部门"
                    >
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
import api from 'api/recruit'
export default {
    data(){
        return {
            userInfo: {},
            currentPage: 1,
            total: 0,
            selectTableData: [],
            // 传递页码
            searchFormData: {
                pageNo: 1,
                pageSize: 15,
                departmentName: null
            },
            postData: {},
            // 数据
            tableData: [
                {
                    departmentName: ''

                }
            ],
            update: false,

            dialogVisible:false,
            addrecuitPart:'',
            addAndPut:false

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
        getTableData(date) {
            api.getdepartmentlist(date).then((response) => {
                // console.log(response)
                this.tableData = response.data.list
                this.total = response.data.total
            })
        },
        // 修改
        editTable(index, data) {
            this.dialogVisible = true

            this.addrecuitPart = data.departmentName

        },
        // 删除
        deleteTable(index, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.deletedepartmentdeleteid(data.id).then((res) => {
                    this.$message({
                        message: '删除部门成功',
                        type: 'success'
                    });
                    this.getTableData(this.searchFormData)
                })

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        },

        // 搜索
        search() {
            this.getTableData(this.searchFormData)
        },
        // 搜索选中后
        handleSelect(item) {
            console.log(item);
        },
        handleSelectionChange(val){

        },

        // 添加部门
        addrecuitPartA() {
            this.dialogVisible = true
            this.addAndPut = true
        },
        addrecuitPartFalse() {
            this.addrecuitPart = ''
            this.dialogVisible = false
        },
        addrecuitPartTrue() {
            if (this.addAndPut){
                let obj = {
                    departmentName:this.addrecuitPart
                }

                api.postdepartmentadd(obj).then((response) => {
                    this.$message({
                        message: '添加部门成功',
                        type: 'success'
                    });
                    this.addAndPut = false
                    this.getTableData(this.searchFormData)
                    this.addrecuitPart = ''
                    this.dialogVisible = false
                })


            } else {
                let obj = {
                    departmentName:this.addrecuitPart
                }

                api.putdepartmentupdate(obj).then((response) => {
                    this.$message({
                        message: '修改部门成功',
                        type: 'success'
                    });
                    this.getTableData(this.searchFormData)
                    this.addrecuitPart = ''
                    this.dialogVisible = false
                })
            }

        }
    },
    created(){},
    mounted(){

    },
    activated() {
        if (this.update) {
            this.currentPage = 1
            this.getTableData()
        }
        this.userInfo = localStorage.getItem('userInfo')
        api.getdepartmentlist(this.searchFormData).then((response) => {
            // console.log(response)
            this.tableData = response.data.list
            this.total = response.data.total
        })
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
