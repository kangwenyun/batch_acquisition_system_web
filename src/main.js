// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Resource from 'vue-resource'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App),
  created () {
    this.redrct()
  },
  methods: {
    redrct () {
      router.beforeEach((to, from, next) => {
        if (to.matched.some(record => record.meta.requiresId)) {
          // this route requires Id, check if logged in
          // if not, redirect to login page.
          if (!this.loggedIn()) {
            next({
              path: '/',
              query: { redirect: to.fullPath }
            })
          } else {
            next()
          }
        } else {
          next() // 确保一定要调用 next()
        }
      })
    },
    loggedIn () {
      var id = sessionStorage.getItem('userId')
      if (id === null) { // 未登录
        console.log('未登录')
        return false
      }
      return true
    }
  }
})
