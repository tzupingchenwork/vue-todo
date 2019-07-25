<template>
    <div class="todoInput">
        <input type="text" 
        placeholder="請輸入..." 
        v-model.trim="todo"
        @keyup.enter="submitHanlder"
        v-focus
        >
    </div>
</template>

<script>
export default {
    data() {
        return{
            todo:''
        }
    },
    methods:{
        submitHanlder(){
            if(!this.todo) return
            this.$store.commit('ADD_TODO',{
                content: this.todo,
                complete: false
            })
            this.todo =''
        }
    }
}
</script>