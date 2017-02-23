<template>
    <div id="vapp">
        <h1>{{msg}}</h1>
    </div>
</template>

<script>
export default {
  
    name: 'app',
    data() {
        return {
            msg: 'Yo, this is vue'
        }
    }
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>