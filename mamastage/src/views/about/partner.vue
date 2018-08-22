<template>
    <div>
        <div class="model_topcol">
            <span>战略合作伙伴</span>
            <div>
                <el-button type="primary" @click="inAddEvent" size="small">添加合作伙伴</el-button>
            </div>
        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">
                <el-table
                    :data="tableData"
                    :height="$store.state.home.modelContentHeight - 20"
                    ref="purchaseListTable"
                    style="width: 100%">
                    <el-table-column
                        prop="picUrl"
                        width="220px"
                        label="商标图">
                        <template slot-scope="scope">
                            <div><img style="width: 120px;" :src="scope.row.picUrl" alt=""></div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="jumpUrl"
                        label="链接"
                    >
                        <template slot-scope="scope">
                            <span>{{scope.row.jumpUrl}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="prop"
                        width="150"
                        label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="editTable(scope.row)"
                                type="text"
                                size="small">
                                修改
                            </el-button>
                            <el-button
                                @click.native.prevent="deleteTable(scope.row)"
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
                <el-form-item label="图片:">
                    <el-upload
                        :action="upDateImgUrl"
                        :data='imgData'
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        list-type="picture-card"
                        :file-list="fileList"
                        :before-upload="beforeAvatarUpload"
                        :limit="1"
                        :on-exceed="handleLimit">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="链接:">
                    <el-input v-model="form.jumpUrl"></el-input>
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
import api from 'api/about'
export default {
    data () {
        return {
            dialogImageUrl: '',

            upDateImgUrl: process.env.API_ROOT + '/f/upload',
            imgData: {
                file: '',
                uploadType: 'www_cms'
            },
            tableData: [
                {
                    picUrl: '',
                    jumpUrl: ''
                }
            ],
            fileList: [],
            total: 0,
            currentPage: 1,
            dialogTitle: '',
            pageSize: 10,
            pageNo: 1,
            dialogFormVisible: false,
            form: {
                id: '',
                jumpUrl: '',
                picUrl: ''
            },
            addpartFlag: true
        }
    },
    methods: {
        handleSizeChange(data){
            this.currentPage = 1
            this.getTableData({pageNo: 1, pageSize: data})
        },
        handleCurrentChange(data){
            this.getTableData({pageNo: data})
        },
        // 上传图片成功
        handleAvatarSuccess(res, file, fileList) {
            this.fileList = fileList
        },
        // 移除图片
        handleRemove(file, fileList) {
            this.fileList = fileList
        },
        // 检测图片大小
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 1

            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 1MB!');
            }
            return isLt2M;
        },
        handleLimit() {

        },
        // 编辑链接
        editTable(data) {
            console.log(data)
            this.fileList = []
            this.dialogTitle = '编辑合作伙伴'
            this.addpartFlag = false
            this.dialogFormVisible = true
            this.form.id = data.id
            this.form.jumpUrl = data.jumpUrl
            let object = {
                status: '',
                uid: '',
                url: data.picUrl
            }

            this.fileList.push(object)
        },
        // 删除
        deleteTable(data) {
            this.$confirm('你确定要删除该伙伴吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 确定下线
                api.deletePartner(data.id).then((res) => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        this.getPartnerList()
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },
        // 新增
        inAddEvent() {
            this.dialogFormVisible = true
            this.dialogTitle = '添加合作伙伴'
            for (let key in this.form) {
                this.form[key] = ''
            }
            this.addpartFlag = true
            this.fileList = []
        },
        getPartnerList(data) {
            api.getPartnerList(data).then((res) => {
                this.tableData = res.data.list
                this.total = res.data.total
            })
        },
        // 关闭dialog
        closeDialog() {
            this.dialogFormVisible = false
        },
        // 确定dialog
        dialogConfirm() {
            this.dialogFormVisible = false
            this.fileList.forEach((file) => {
                if (file.response) {
                    this.form.picUrl = file.response.data.url
                } else {
                    this.form.picUrl = file.url
                }
            })
            if (this.addpartFlag) {
                // 新增伙伴
                api.addPartner(this.form).then((res) => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '新增成功！'
                        })
                        this.getPartnerList()
                    }
                })
            } else {
                // 编辑伙伴
                api.editPartner(this.form).then((res) => {
                    if (res.result == 1) {
                        this.$message({
                            type: 'success',
                            message: '修改成功！'
                        })
                        this.getPartnerList()
                    }
                })
            }
        }
    },
    mounted() {
        this.getPartnerList()
    }
}
</script>

<style scoped>

</style>
