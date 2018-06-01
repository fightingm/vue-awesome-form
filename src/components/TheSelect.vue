<template>
  <div>
    <span v-if="!inTable">{{title}}</span>
    <select v-model="msg">
      <option 
        v-for="(item, index) in options"
        :key="index"
        :value="item.value">{{item.label}}</option>
    </select>
  </div>
</template>

<script>
import { store } from '../store'
export default {
  name: 'TheSelect',
  props: ["options", 'title', 'objKey', 'objVal', 'inTable'],
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
      // options: this.options
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
