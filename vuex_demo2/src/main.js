import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Antd from "ant-design-vue"
import 'ant-design-vue/dist/antd.css'
import router from './router'
const G2 = require('@antv/g2')
Vue.prototype.$G2 = G2
Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
