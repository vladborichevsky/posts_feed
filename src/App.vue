<template>
  <div class="container">
    <RouterView/>
  </div>
</template>


<script>
  import { RouterView } from 'vue-router'

  export default {
    mounted() {
      this.$store.dispatch('post/getNewPosts')
    }
  }
</script>


<style scoped>
  .container {
    width: 1100px;
    margin: 0 auto;
  }
</style>
