<template>
    <div id="vapp">
        <h1>{{msg}}</h1>
        <p>
            <input @keyup.enter="updateTitle" type="text"/>
            <button type="button" @click="showAlert('yo')">click me!!</button>
        </p>
    </div>
</template>

<script>
export default {
  
    name: 'app',
    data() {
        return {
            msg: 'Yo, this is vue'
        }
    },
    methods: {
        updateTitle: function(event) {
            this.msg = event.target.value;
        },
        showAlert: function(msg) {
            alert(msg);
        }
    }
}
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