<template>
    <div>
        <div class="model_topcol">

        </div>
        <div class="model_content" >
            <div class="content" :style="{height: $store.state.home.modelContentHeight - 20 + 'px'}">

            </div>
        </div>
        <div class="model_footer">
            <el-button style="width: 90px" type="primary" size="small" @click="save">保存</el-button>
            <el-button style="width: 90px" size="small" v-RouterBack>返回列表</el-button>
        </div>
    </div>
</template>

<script>
export default {
    components: {
    },
    data(){
        return {
            caseId:'',
            caseDeadilForm:{

            }
        }
    },
    computed:{

    },
    methods:{
        get() {

        },
        clearAll() {
            for (let key in this.addFormData) {
                this.addFormData[key] = null
            }
        }
    },
    created(){},
    mounted(){


    },
    activated() {
        this.clearAll()
        this.caseId = this.$route.params.id

    }
}
</script>

<style scoped>
    .model_footer{
        line-height: 50px;
        text-align: left;
        padding-left: 40px;
    }
</style>
