<template>
    <li :class="{complete: isComplete}">
        <label>
            <input type="checkbox" v-model="isComplete"/>
            {{text}}
        </label>
    </li>
</template>
<script>
const TodoItem = {
    name: 'todoitem',
    props: ['id', 'text', 'complete', 'onComplete'],
    data() {
        return {
            isComplete: this.complete
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
}
li.complete {
    text-decoration: line-through;
    color: green;
}
</style>