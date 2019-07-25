<template>
<div id="app">
    <div id="nav">
        <router-link to="/all" >全部</router-link>
        <router-link to="/active" >未完成</router-link>
        <router-link to="/complete" >已完成</router-link>
    </div>
    <ToDoInput />
    <div id="list" >
        <ToDoListItem  v-for="index in todoIndex" :key="index" :index="index"/>
    </div>
</div>
</template>
<script>
import ToDoInput from '@/components/Todoinput/index.vue'
import ToDoListItem from '@/components/TodolistItem/index.vue'
export default {
    components:{
        ToDoInput,
        ToDoListItem
    },
    computed:{
        todoIndex(){
            return this.$store.getters['todoIndex']
        }
    },
    mounted(){
        this.$store.dispatch('INIT_TODOS')
    }
}
</script>
