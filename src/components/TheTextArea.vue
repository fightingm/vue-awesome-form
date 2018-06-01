<template>
  <div>
    <span v-if="!inTable">{{title}}</span><textarea type="text" v-model="msg"></textarea>
  </div>
</template>

<script>
import { store } from '../store'
export default {
  name: 'TheTextArea',
  props: ['title', 'objKey', 'objVal', 'inTable'],
  watch: {
    msg: function(newVal, oldVal) {
      store.commit('setFormData', {
        key: this.keyName,
        value: newVal
      });
    }
  },
  data () {
    return {
      msg: this.objVal,
      keyName: this.objKey
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
