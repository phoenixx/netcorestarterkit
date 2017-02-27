import Vue from 'vue';
import App from './app.vue';
import TodoItem from './components/todoitem.vue';

Vue.component('todo-item', TodoItem);

new Vue({
    name: 'main',
    el: '#app',
    render: h => h(App)
})