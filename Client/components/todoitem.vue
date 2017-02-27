<template>
    <li>
        <label>
            <input type="checkbox" v-model="complete"/>
            {{text}}
        </label>
    </li>
</template>
<script>
const TodoItem = {
    name: 'todoitem',
    props: ['text', 'complete']
}

export default TodoItem;
</script>
<style type="sass" scoped>
ul, li {
    list-style-type:none;
    color: green;
}
</style>