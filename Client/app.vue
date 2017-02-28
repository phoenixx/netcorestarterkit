<template>
    <div id="vapp" class="row">
        <div class="col-md-6 col-md-offset-3">
            <h1>{{msg}}</h1>
            <h2>{{completeItems}} / {{items.length}} completed ({{percentComplete}}%{{completeMessage}})</h2>
            <form class="form-inline" v-on:submit.prevent>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="itemText" v-on:keyup.enter="addItem()" placeholder="New item..."/>
                </div>
                <button type="button" class="btn btn-primary" @click.prevent="addItem()" :disabled="addDisabled">Add item</button>
            </form>
            <div class="controls">
                <button type="button" class="btn btn-sm" @click="completeAll()" :disabled="items.length === 0" :class="percentComplete < 100 ? 'btn-success' : 'btn-warning'">
                    <span class="glyphicon glyphicon-ok-sign"></span>&nbsp;
                    <span v-if="percentComplete < 100">
                        Mark all complete
                    </span>
                    <span v-else>
                        Mark all incomplete
                    </span>
                </button>
                <button type="button" class="btn btn-danger btn-sm" @click="removeAll()" :disabled="items.length === 0">
                    <span class="glyphicon glyphicon-remove-sign"></span>&nbsp;
                    Remove all
                </button>
            </div>
            <p>
            <draggable :list="items" :options="dragOptions" element="div">
                <!--<transition-group name="todolist">-->
                    <div v-for="item in items" :key="item.id" class="todolist-item">
                    <todo-item 
                        :id="item.id"
                        :text="item.text"
                        :complete="item.complete"
                        v-on:toggleComplete="markComplete(item)"
                        v-on:onComplete="markComplete(item)"
                        v-on:removeItem="removeItem(item)"
                        v-on:changeItemText="changeItemText"></todo-item>
                    </div>
                <!--</transition-group>-->
            </draggable>
            </p>
        </div>
    </div>
</template>

<script>
import TodoItem from './components/todoitem.vue';
import uuidV4 from 'uuid/v4'
import capitalize from 'lodash/capitalize';
import fetch from 'isomorphic-fetch';
import draggable from 'vuedraggable';

const App = {
    name: 'app',
    data() {
        return {
            msg: 'Vue.js todo list',
            itemText: '',
            items: []
        }
    },
    components: {
        draggable,
        TodoItem
    },
    mounted: function() {
        const url = "/todos";
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json);
                this.items = json;
            });
    },
    computed: {
        dragOptions () {
            return {
                animation: 100,
                ghostClass: 'ghost'
            }
        },
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
            if (isNaN(items) || isNaN(done) || items === 0) return 0;
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
            item.complete = !item.complete;
        },
        completeAll: function() {
            for (let item of this.items) {
                item.complete = !item.complete;
            }
        },
        removeAll: function() {
            this.items = [];
        },
        removeItem: function(item) {
            this.items = this.items.filter((i) => {
                return i.id !== item.id;
            });
        },
        changeItemText: function(item) {
            const thisItem = this.items.filter((i) => {
                return i.id === item.id;
            });
            thisItem[0].text = item.text;
        },
        addItem: function() {
            if (this.addDisabled) return;
            if (!this.itemText || this.itemText.length === 0) {
                alert("nope");
            } else {

                const matches = this.items.filter((i) => {
                    return i.text === capitalize(this.itemText);
                });

                if (matches.length > 0) {
                    alert("This item already exists!");
                } else {
                    this.items.push({
                        id: uuidV4(),
                        text: capitalize(this.itemText),
                        complete: false
                    });
                    this.itemText = '';
                }
            }
        },
        onStart: function(i, j) {
            console.log("start", i, j);
        },
        onEnd: function(i, j) {
            console.log("end", i, j);
        }
    }
}

export default App;
</script>

<style lang="scss" >
#vapp {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.controls {
    padding: 10px;
}

.todolist-item {
  transition: all 0.6s;
}

.ghost {
  opacity: .5;
  background: #FF9800;
}

</style>