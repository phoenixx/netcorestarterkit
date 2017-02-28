<template>
    <li>
        <div class="todo" :class="{complete: complete}">
            <div class="todo--label">
                <span v-if="!editing" @click="toggleEdit">
                {{text}}
                </span>
                <span v-if="editing">
                    <input type="text" class="form-control form-control--narrow" @change="editItemText" v-model="itemText" @keyup.enter.esc="editing = false">
                </span>
                <span class="todo--remove">
                    <button type="button" class="btn btn-danger btn-xs" @click="removeItem" :disabled="editing === true"><span class="glyphicon glyphicon-minus-sign"></span>&nbsp;Remove</button>
                </span>
            </div>
            <div class="todo--controls">
                <button type="button" class="btn btn-success btn-xs" @click="toggleItem" :disabled="complete === true || editing === true"><span class="glyphicon glyphicon-ok-sign"></span>&nbsp;Done</button>
                <button type="button" class="btn btn-warning btn-xs" @click="toggleItem" :disabled="complete === false || editing === true"><span class="glyphicon glyphicon-remove-sign"></span>&nbsp;Not done</button>
            </div>
        </div>
    </li>
</template>
<script>
const TodoItem = {
    name: 'todoitem',
    props: ['id', 'text', 'complete'],
    data() {
        return {
            isComplete: this.complete,
            editing: false,
            itemText: this.text
        }
    },
    methods: {
        removeItem: function() {
            this.$emit('removeItem');
        },
        toggleItem: function() {
            this.$emit('toggleComplete');
        },
        toggleEdit: function() {
            if (this.complete === true) return; //don't allow editing completed
            this.editing = !this.editing;
        },
        editItemText: function() {
            this.$emit('changeItemText', {id: this.id, text: this.itemText});
            this.toggleEdit();
        }
        
     }//,
    // watch: {
    //      isComplete: function(val) {
    //          this.$emit('onComplete');
    //      }
    //  }
}

export default TodoItem;
</script>
<style type="sass" scoped>
ul, li {
    list-style-type:none;
    margin-top: 8px;
}

.todo {
    width: 400px;
    border: solid 1px #CFD8DC;
    padding: 10px;
    /*border-radius: 8px;*/
    margin: 0 auto;
    min-height: 80px;
}

.todo.complete {
    background-color: #81C784;    
}

.todo--label {
    text-align: left;
    padding: 0 0 10px 0;
    font-size: 1.2em;
    font-weight: bold;
    cursor: pointer;
}

.todo.complete > .todo--label {
    text-decoration: line-through;
    font-style: italic;
    color: #78909C;
}

.todo--controls {
    float: left;
    width: 100%;
    clear: both;
}

.todo--remove {
    float: right;
    margin-right: 10px;
    width: 60px;
}

.form-control--narrow {
    width: 75%;
    display: inline-block;
}

</style>