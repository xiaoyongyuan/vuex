<template>
    <div id="app">
        <div class="top_list">
            <a-input placeholder="请输入任务" :value="inputValue" @change="hanleBtn" class="my_ipy" />
            <a-button type="primary" class="top_btn" @click="addItem">添加事项</a-button>
        </div>
        <div class="dt-list">
            <a-list bordered="bordered" :data-source="infolist" >
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-checkbox :checked="item.done" @change="(e) => {statusChange(e, item.id)}">{{item.info}}</a-checkbox>
                    <a slot="actions" @click="removeItemById(item.id)">删除</a>
                </a-list-item>
                <div slot="footer" class="footer">
                    <span>{{unDoneLength}}条剩余</span>
                    <a-button-group>
                        <a-button :type="viewKey === 'all' ? 'primary':'default'" @click="changeList('all')">全部</a-button>
                        <a-button :type="viewKey === 'undone' ? 'primary':'default'" @click="changeList('undone')">未完成</a-button>
                        <a-button :type="viewKey === 'done' ? 'primary':'default'" @click="changeList('done')">已完成</a-button>
                    </a-button-group>
                    <a @click="clear">清理已经完成</a>
                </div>
            </a-list>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapState} from "vuex";
    export default {
        name: "page1",
        computed: {
            ...mapState(['inputValue','viewKey']),
            ...mapGetters(['unDoneLength', 'infolist'])
        },
        created() {
            this.$store.dispatch('getList')
        },
        methods: {
            hanleBtn(e) {
                this.$store.commit('setInputValue', e.target.value)
            },
            // 向列表中添加 item 项
            addItem() {
                if(this.inputValue.trim().length <= 0){
                    return this.$message.warning('文本框内容不能为空！')
                }
                this.$store.commit('addItem')
            },
            // 根据 id 删除对应的任务事项
            removeItemById(id) {
                this.$store.commit('removeItem', id)
            },
            // 监听复选框中状态变化事件
            statusChange(e, id) {
                const param = {
                    id:id,
                    status: e.target.checked
                };
                this.$store.commit('chageStatus', param)
            },
            //清除已完成任务
            clear() {
                this.$store.commit('clearDone')
            },
            // 修改页面上展示的列表
            changeList(key) {
                this.$store.commit('changViewKey', key)
            }
        }
    }
</script>

<style scoped>
    #app {
        padding: 10px;
    }
    .top_list{
        width: 500px;
        display: flex;
    }
    .my_ipy {
        width: 600px;
    }
    .top_btn{
        margin-left: 10px;
    }
    .dt-list {
        width: 500px;
        margin-top: 20px;
    }
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
