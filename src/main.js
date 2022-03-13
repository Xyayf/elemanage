import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/reset.less'
Vue.use(ElementUI)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.token) {
      if (!store.state.user.userInfo) {
        store.dispatch('user/getUserinfo')
      }
      next()
    } else {
      next('/login')
    }
  } else {
    if (store.state.user.token) {
      next('/')
    } else {
      next()
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
