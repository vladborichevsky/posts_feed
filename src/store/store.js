import { createStore } from "vuex"

import { postBlock } from "@/store/postBlock.js"

export default createStore( {
  modules: { 
    post: postBlock
  }
})
