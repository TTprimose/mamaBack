<template>
  <div id="app" :style="{width: $store.state.home.device.width+'px', height: $store.state.home.device.height+'px'}">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    data(){
        return {

        }
    },
    created() {

    },
    computed: {

    }

}
</script>

<style>

</style>
