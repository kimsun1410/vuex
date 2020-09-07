const storage = {
    fetch() {
        const arry = [];
        if( localStorage.length > 0 ){
            for ( let i = 0; i < localStorage.length ; i++ ){
                if(localStorage.key(i) !== 'loglevel:webpack-dev-server'){
                    arry.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
                }
            }
        }
        return arry;
    },
};

const state = {
    todoItems: storage.fetch()
};

const getters = {
    storedTodoItems(state){
        return state.todoItems;
    }
};

const mutations = {
    addOneItem(state, todoItem){
        const obj = { completed: false, item: todoItem };
        localStorage.setItem(todoItem, JSON.stringify(obj));
        state.todoItems.push(obj);
    },
    removeOneItem(state, payload){
        localStorage.removeItem(payload.todoItem.item);
        state.todoItems.splice(payload.index, 1);
    },
    toggleOneItem(state, payload){
        state.todoItems[payload.index].completed = ! state.todoItems[payload.index].completed;
        // 로컬스토리지 데이터 갱신 부분
        localStorage.removeItem(payload.todoItem.item);
        localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
    },
    clearAllItem(state){
        localStorage.clear();
        state.todoItems = [];
    }
};

export default { 
    state,
    getters,
    mutations    
}
