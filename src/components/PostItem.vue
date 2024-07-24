<template>
  <div
    @click="goToPost(post.id)"
    class="post">
      <div class="post_title">{{ post.title }}</div>
      <div class="post_body">{{ post.body }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true
      }
    },

    methods: {
      goToPost(id) {
        this.$router.push(`/social/post/${id}`)
      }
    }
  }
</script>

<style scoped>
  .post {
    width: 80%;
    border: 2px solid var(--black-color);
    margin: 0 auto;
    padding: 10px 30px;
    margin-bottom: 20px;
    cursor: pointer;
  }

  .post:hover {
    transition: all .4s;
    background-color: var(--main-green);
    color: var(--white-color);
  }

  .post_title {
    font-size: 22px;
    font-weight: 600;
  }

  .post_body {
    font-size: 18px;
  }
</style>