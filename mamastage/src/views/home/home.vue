<template>
    <div class="app" :style="{width: $store.state.home.device.width+'px', height: $store.state.home.device.height+'px'}">
        <HQSilder :menuList = "menuList"></HQSilder>
        <HQContent></HQContent>
    </div>
</template>

<script>
import HQSilder from "views/home/slider";
import HQContent from "views/home/content";
export default {
    name: "home",
    components: {
        HQSilder,
        HQContent
    },
    data() {
        return {
            menuList: [
                { text: "案例", name: 'case', icon: "fa fa-indent" },
                { text: "新闻", name: 'news', icon: "fa fa-newspaper-o" },
                { text: "招聘", name: 'recruit', icon: "fa fa-users" },
                { text: "关于", name: 'about', icon: "fa fa-user-circle-o" },
                { text: "商学院", name: 'college', icon: "fa fa-graduation-cap" }
            ]

        };
    },
    computed: {

    },
    methods: {},
    created() {

    }
};
</script>
