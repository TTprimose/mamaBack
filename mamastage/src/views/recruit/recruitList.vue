<template>
    <div>
        <div class="model_topcol">
            <span>招聘列表</span>
            <div>
                <el-button type="primary" @click="inAddEvent" size="small">添加招聘信息</el-button>
            </div>
        </div>
        <div class="model_content" :style="{height: $store.state.home.modelContentHeight + 'px'}">
            <div class="model_content_inner">
                <div class="purchaseList_title">
                    <el-select v-model="searchFormData.departmentId" placeholder="请选择" size='small' :style="{width: '150px'}" @change="clearSearchStr"  clearable >
                        <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.departmentName"
                            :value="item.id"
                            >
                        </el-option>
                    </el-select>
                    <el-input
                        size="small"
                        placeholder="请输入岗位名称"
                        prefix-icon="el-icon-search"
                        :style="{width: '378px'}"
                        @keyup.enter.native='search'
                        clearable
                        @change="clearSearchStr"
                        v-model="searchFormData.position">
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
                        prop="position"
                        label="标题"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态">
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.status"
                                active-text="开启"
                                inactive-text="关闭"
                                @change="swithChange(scope.row)">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="sort"
                        label="排序">
                    </el-table-column>
                    <el-table-column
                        prop="releaseTime"
                        label="发布时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.storeTime | time_s}}</span>
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
                                @click.native.prevent="enterTable(scope.$index, scope.row)"
                                type="text"
                                size="small">
                                查看
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
                position: null,
                departmentId:null
            },
            postData: {},
            // 数据
            tableData: [],
            update: false,
            options: []
        }
    },
    computed:{},
    methods:{
        swithChange(data) {

            let bl = ''

            if (data.status == false){
                bl = 1
            } else {
                bl = 0
            }
            let obj = {
                id: data.id,
                status: bl
            }

            api.deletejoinisopen(obj).then((res) => {
                this.$message({
                    message: '状态修改成功',
                    type: 'success'
                });
                this.getTableData(this.searchFormData)
            })

        },
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
            api.getjoinlist(data).then((response) => {
                this.tableData = response.data.list
                this.total = response.data.total

                for (let i in this.tableData){
                    if (this.tableData[i].status == 0){
                        this.tableData[i].status = true
                    } else {
                        this.tableData[i].status = false
                    }
                }
            })

        },
        // 跳转详情页
        enterTable(index, data) {
            this.$router.push({name: '招聘详情', params: {id: data.id}})
        },
        // 修改
        editTable(index, data) {
            this.$router.push({
                name: '添加招聘信息',
                params: {id: data.id}
            })
        },
        // 删除
        deleteTable(index, data) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                api.deletejoindeleteid(data.id).then((res) => {
                    this.$message({
                        message: '删除成功',
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
        inAddEvent(){
            this.$router.push({
                name: '添加招聘信息'
            })
        }
    },
    created(){},
    mounted(){

    },
    activated() {
        if (this.update) {
            this.currentPage = 1
        }
        this.userInfo = localStorage.getItem('userInfo')
        this.getTableData(this.searchFormData)

        api.getdepartmentlist().then((response) => {
            // console.log(response)
            this.options = response.data.list
        })
    },
    beforeRouteLeave(to, from, next) {
        if (to.name == '添加招聘信息') {
            this.update = true
        } else {
            this.update = false
        }
        next()
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
