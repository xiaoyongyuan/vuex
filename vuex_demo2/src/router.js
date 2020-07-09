import Vue from 'vue'
import VueRouter from "vue-router"
import page1 from "./components/page1";
import page2 from "./components/page2";
Vue.use(VueRouter)
export default new VueRouter({
    routes: [
        {path:'/page1',component:page1},
        {path:'/page2',component: page2}
    ]
})

