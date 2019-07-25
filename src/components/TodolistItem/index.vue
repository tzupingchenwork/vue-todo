<template>
  <div class="todoListItem">
    <input type="text" 
    v-model.trim="edit" 
    v-if="edit != null" 
    v-focus
    @keyup.enter="submitHandler"
    @keyip.esc="cancelHandler"
    @blur="cancelHandler"
    >
    <template v-else>
      <input type="checkbox" v-model="complete">
      <label @dblclick="editHandler">{{todo.content}}</label>
      <button class="destroy" @click="destroyHandler">X</button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      edit: null
    };
  },
  computed: {
    todo() {
      return this.$store.state.todos[this.index];
    },
    complete: {
      get() {
        return this.todo.complete;
      },
      set(val) {
        this.$store.commit("UPDATE_TODO", {
          index: this.index,
          data: {
            content: this.todo.content,
            complete: val
          }
        });
      }
    }
  },
  methods: {
    destroyHandler() {
      if (confirm(`是否刪除 ${this.todo.content}`))
        this.$store.commit("REMOVE_TODO", this.index);
    },
    editHandler() {
      this.edit = this.todo.content;
    },
    submitHandler(){
        if(!this.edit) this.destroyHandler()
        this.$store.commit('UPDATE_TODO',{
            index: this.index,
            data:{
                content: this.edit,
                complete: this.todo.complete
            }
        })
        this.cancelHandler()
    },
    cancelHandler(){
        this.edit = null
    }
  }
};
</script>