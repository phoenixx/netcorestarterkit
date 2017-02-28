<template>
    <li :class="{complete: isComplete}">
        <label>
            <input type="checkbox" v-model="isComplete"/>
            {{text}}
        </label>
        <button type="button" @click="removeItem">Remove</button>
    </li>
</template>
<script>
const TodoItem = {
    name: 'todoitem',
    props: ['id', 'text', 'complete'],
    data() {
        return {
            isComplete: this.complete
        }
    },
    methods: {
        removeItem: function() {
            this.$emit('removeItem');
        }
    },
    watch: {
         isComplete: function(val) {
             this.$emit('onComplete');
         }
     }
}

export default TodoItem;
</script>
<style type="sass" scoped>
ul, li {
    list-style-type:none;
    color: red;
    cursor:pointer;
}

label {
    cursor:pointer;
}

li.complete {
    text-decoration: line-through;
    color: green;
}
</style>