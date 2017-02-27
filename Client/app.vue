<template>
    <div id="vapp">
        <h1>{{msg}}</h1>
        <h2>{{completeItems}} / {{items.length}} completed ({{percentComplete}}%{{completeMessage}})</h2>
        <p>
            <input type="text" v-model="itemText" v-on:keyup.enter="addItem()"/>
            <button type="button" @click="addItem()" :disabled="addDisabled">Add item</button>
        </p>
        <p>
            <ul v-for="item in items">
                <todo-item :id="item.id" :text="item.text" :complete="item.complete" v-on:onComplete="markComplete(item)"></todo-item>
            </ul>
        </p>
    </div>
</template>

<script>
import TodoItem from './components/todoitem.vue';
import uuidV4 from 'uuid/v4'

const App = {
    name: 'app',
    data() {
        return {
            msg: 'Todo Simple',
            itemText: '',
            items: [
                {
                    id: uuidV4(),
                    text: "Feed dog",
                    complete: false
                },
                {
                    id: uuidV4(),
                    text: "Sleep",
                    complete: false
                },
                {
                    id: uuidV4(),
                    text: "Washing up",
                    complete: false
                },
                {
                    id: uuidV4(),
                    text: "Get bread",
                    complete: false
                }
            ]
        }
    },
    computed: {
        addDisabled: function() {
            return this.itemText === null || this.itemText.length === 0;
        },
        completeItems: function() {
            const complete = this.items.filter((item) => {
                return item.complete === true;
            });
            return complete.length;
        },
        percentComplete: function() {
            const items = this.items.length;
            const done = this.completeItems;
            return Math.round(((done / items) * 100),2);
        },
        completeMessage: function() {
            const complete = this.percentComplete;
            if (complete === 100) {
                return " Woohoo. Way to go";
            }
            if (complete >= 75) {
                return " Almost done...";
            }
            return null;
        }
    },
    methods: {
        markComplete: function(item) {
            let thisItem = this.items.filter((i) => {
                return i.id === item.id;
            });
            if (thisItem.length !== 1) {
                console.warn("Nowt found.");
            } else {
                thisItem[0].complete = !thisItem[0].complete;
            }
        },
        addItem: function() {
            if (this.addDisabled) return;
            if (!this.itemText || this.itemText.length === 0) {
                alert("nope");
            } else {
                this.items.push({
                    id: uuidV4(),
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