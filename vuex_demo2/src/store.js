import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        list:[],
        // 文本框的内容
        inputValue: '',
        nextId: 3,
        viewKey: "all"
    },
    // 在mutations里面不能执行异步操作，只能在mutations中修改state中的数据
    // 调用mutations使用commit
    mutations:{
        initList(state, list) {
            state.list = list
        },
        setInputValue(state, val) {
            state.inputValue = val
        },
        // 添加列表项
        addItem(state) {
            const obj = {
                id: state.nextId,
                info: state.inputValue.trim(),
                done: false
            }
            state.list.push(obj)
            state.nextId++
            state.inputValue = ''
        },
        // 根据 Id  删除对应的
        removeItem(state, id) {
            const i = state.list.findIndex(x => x.id === id)
            if(i !== -1){
                state.list.splice(i,1)
            }
        },
        chageStatus(state, param) {
            const i = state.list.findIndex( x => x.id === param.id)
            if(i !== -1){
                state.list[i].done = param.status
            }
        },
        //清除已完成任务
        clearDone(state) {
            state.list = state.list.filter(x =>x.done === false)
        },
        // 按需切换按钮选中
        changViewKey(state, key) {
            state.viewKey = key;
        }
    },
    // actions中使用dispatch调用
    actions:{
        getList(context) {
            axios.get('/list.json').then(({ data }) =>{
                context.commit('initList', data)
            })
        }
    },
    // Store 中的数据发生变化，Getter的数据也会跟着变化
    getters:{
        unDoneLength(state) {
            return state.list.filter(x => x.done === false).length
        },
        infolist(state) {
            if(state.viewKey === 'all') {
                return state.list
            }
            if(state.viewKey === 'undone'){
                return state.list.filter(x => !x.done)
            }
            if(state.viewKey === 'done'){
                return state.list.filter(x =>x.done)
            }
            return state.list
        }
    }
})
