<template>
  <div>
    <h2>{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'TheTitle',
  props: ['title', 'objKey'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      keyName: this.objKey
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
