<template>
    <div id="vapp">
        <h1>{{msg}}</h1>
        <p>
            <input type="text" v-model="itemText"/>
            <button type="button" @click="addItem()" :disabled="addDisabled">Add item</button>
        </p>
        <p>
            <ul v-for="item in items">
                <todo-item :text="item.text" :complete="item.complete"></todo-item>
            </ul>
        </p>
    </div>
</template>

<script>
import TodoItem from './components/todoitem.vue';

const App = {
    name: 'app',
    data() {
        return {
            msg: 'Todo Simple',
            itemText: '',
            items: [
                {
                    text: "test",
                    complete: false
                },
                {
                    text: "test2",
                    complete: false
                },
                {
                    text: "test3",
                    complete: false
                }
            ]
        }
    },
    computed: {
        addDisabled: function() {
            console.log("addDisabled");
            return this.itemText === null || this.itemText.length === 0;
        }
    },
    methods: {
        updateTitle: function(event) {
            this.msg = event.target.value;
        },
        showAlert: function(msg) {
            alert(msg);
        },
        addItem: function() {
            if (!this.itemText || this.itemText.length === 0) {
                alert("nope");
            } else {
                this.items.push({
                    text: this.itemText,
                    complete: false
                });
                this.itemText = '';
            }
            
        }
    }
}

export default App;
</script>
<style lang="scss">
#vapp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>