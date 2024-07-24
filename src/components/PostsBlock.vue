<template>

  <my-spinner
    v-if="postsArray.length == 0"
  />

  <transition-group name="post-list">
    <div 
      v-for="post in postsArray"
      :key="post?.id"
      class="posts_block">
        <post-item 
          :post="post"
        />
    </div>
  </transition-group>

  <my-button 
    v-show="postsArray.length > 0 && postsArray.length != $store.state.post.postsArr.length"
    @click="showMorePosts()">
      Показать ещё
  </my-button>

  <my-button 
    v-show="postsArray.length > 0 && postsArray.length == $store.state.post.postsArr.length"
    @click="pageUp()">
      Наверх
  </my-button>

</template>

<script>
  import PostItem from "/src/components/PostItem.vue";
  
  export default {
    components: { PostItem },

    data() {
      return {
        lastPostNumber: 3
      }
    },

    computed: {
      postsArray() {
        return this.$store.state.post.postsArr.slice(0, this.lastPostNumber)
      }
    },

    methods: {
      showMorePosts() {
        this.lastPostNumber += 10
        this.$store.dispatch('post/getNewPosts')
      },
      
      pageUp() {
        window.scrollTo(0, 0); 
      }
    },

    watch: {
      lastPostNumber() {
        window.sessionStorage.setItem('lastPostNumber', this.lastPostNumber)
      }
    },
    
    mounted() {
      this.$store.dispatch('post/getNewPosts')

      if (window.sessionStorage.getItem('lastPostNumber')) {
        this.lastPostNumber = +window.sessionStorage.getItem('lastPostNumber')
      }

    }
  }
</script>

<style scoped>
  /* все css-стили нужны для анимации постов */
  .post-list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .post-list-enter-active,
  .post-list-leave-active {
    transition: all 1s ease;
  }

  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

</style>