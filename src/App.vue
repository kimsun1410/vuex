<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- <TodoInput v-on:하위 컴터넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메서드명"></TodoInput> -->
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList 
    v-bind:propsdata="todoItems" 
    v-on:removeItem="removeOneItem" 
    v-on:toggleItem="toggleOneItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItem"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoFooter from './components/TodoFooter'

export default {
  data() {
      return{
          todoItems: []
      }
  },
  methods: {
    addOneItem(todoItem){
        const obj = { completed: false, item: todoItem };
        // localStorage.setItem(this.newTodoItem, obj);
        localStorage.setItem(todoItem, JSON.stringify(obj));
        this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index) {
        localStorage.removeItem(todoItem.item);
        this.todoItems.splice(index, 1);
    },
    toggleOneItem(todoItem, index){
        // console.log(todoItem);
        this.todoItems[index].completed = ! this.todoItems[index].completed;
        // 로컬스토리지 데이터 갱신 부분
        localStorage.removeItem(todoItem.item);
        localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItem(){
      localStorage.clear();
      this.todoItems = [];
    }
  },
  // 라이프 사이클 훅
  created() {
        if( localStorage.length > 0 ){
            for ( let i = 0; i < localStorage.length ; i++ ){
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                    // JSON.parse(localStorage.getItem(localStorage.key(i)));
                    // this.todoItems.push(localStorage.key(i));
                    this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
                // console.log(localStorage.key(i));
            }
        }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  }
}
</script>

<style>
body{
  text-align:center;
  background-color:#f6f6f6;
}
input{
  border-style: groove;
  width:200px;
}
button{
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>

