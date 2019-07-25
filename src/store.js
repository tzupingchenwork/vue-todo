import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const LS = {
  load(){
   return JSON.parse(localStorage.getItem('vue-todos') || '[]')
  },
  save(data){
    localStorage.setItem('vue-todos', JSON.stringify(data))
  }
}

const filterTodo = {
  all(todos){
    return todos
  },
  active(todos){
    return todos.filter(todos => {
      return !todos.complete
    })
  },
  complete(todos){
    return todos.filter(todos => {
      return todos.complete
    })
  }
}

export default new Vuex.Store({
  strict:true,
  state: {
    todos:[
      {content:'todo-content',complete: false},
    ]
  },
  getters:{
    todoIndex(state){
      return filterTodo[state.route.name](state.todos).map( todo => state.todos.indexOf(todo))
      //中括號讀取物件屬性
    }
  },
  mutations: {
    SET_TODOS(state, data ){
      state.todos = data
      //sves LS
      LS.save(state.todos)
    },
    ADD_TODO(state, data){
      state.todos.push(data)
      LS.save(state.todos)
    },
    UPDATE_TODO(state,{index,data}){
      state.todos[index].complete = data.complete
      state.todos[index].content = data.content
      LS.save(state.todos)
    },
    REMOVE_TODO(state,index){
      state.todos.splice(index,1)
      LS.save(state.todos)
    }
  },
  actions: {
    INIT_TODOS({ commit }){
      //讀取LS
      commit('SET_TODOS',LS.load())
    }
  }
})
