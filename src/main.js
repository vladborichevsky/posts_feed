import './assets/styles/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import UIcomponents from '@/components/UI/UIcomponents.js'
import store from '@/store/store.js'
import router from '@/router/router'

const app = createApp(App)

UIcomponents.forEach(compoment => {
  app.component(compoment.name, compoment)
})

app.use(store)
app.use(router)

app.mount('#app')