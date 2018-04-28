<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {},
    created() {
      this.$store.dispatch('setClassifyCond', {
        vueInstance: this
      })
    }
  }
</script>
