<template>
  <div class="container">

    <div class="post_descr">
      <div class="post_number">
        Пост номер: {{ postID }}
      </div>

      <div class="post_user_id">
        userId: {{ postsArray[postID]?.userId }}
      </div>
    </div>

    <div class="post_title">
      {{ postsArray[postID]?.title }}
    </div>

    <div class="post_body">
      {{ postsArray[postID]?.body }}
    </div>

  </div>

  <my-button
    @click="back()">
      назад
  </my-button>
</template>

<script>
  export default {
    computed:{
      postID() {
        return this.$route.params.id
      },

      postsArray() {
        return this.$store.state.post.postsArr
      }
    },

    methods: {
      back() {
        this.$router.push('/social')
      }
    },

    mounted() {
      if(this.$store.state.post.postsArr.length == 0) {
        this.$store.dispatch('post/getNewPosts')
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 800px;
    height: 350px;
    margin: 0 auto;
    padding: 15px;
    background-color: var(--main-green);
    border-radius: 5px;
    color: var(--white-color);
    margin-bottom: 40px;
  }

  .post_descr {
    display: flex;
    justify-content: space-between;
  }

  .post_number {
    font-size: 14px;
  }

  .post_title {
    font-size: 40px;
    font-weight: 600;
    margin: 40px 0;
  }

  .post_body {
    /* width: 500px; */
    margin: 0 auto;
    padding: 15px;
    text-align: justify;
    font-size: 25px;
    border: 2px solid var(--main-green);
  }

  .post_user_id {
    font-size: 14px;
  }

</style>