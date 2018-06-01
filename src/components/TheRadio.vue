<template>
  <div>
    <span v-if="!inTable">{{title}}</span>
    <div 
      v-for="(item, index) in options"
      :key="index">
      <label>
        {{item.label}}
        <input type="radio" :value="item.value" v-model="msg">
      </label>
    </div>
  </div>
</template>

<script>
import { store } from '../store'
export default {
  name: 'TheRadio',
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
