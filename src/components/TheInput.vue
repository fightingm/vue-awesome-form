<template>
  <div class="jf-form-item">
    <label class="jf-form-item-label" v-if="!inTable">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-input-wrapper jf-input-type">
        <input class="jf-input" type="text" v-model="msg">
        <slot></slot>
      </div>
    </div>
    
  </div>
</template>

<script>
import { store } from '../store'
export default {
  name: 'TheInput',
  props: ['title', 'objKey', 'objVal', 'inTable'],
  watch: {
    msg: function(newVal, oldVal) {
      // store.commit('setFormData', {
      //   key: this.keyName,
      //   value: newVal
      // });
    }
  },
  computed: {
    msg: {
      get: function() {
        return this.objVal;
      },
      set: function() {
        console.log('???', this.msg);
        store.commit('setFormData', {
          key: this.keyName,
          value: 'xxxxx'
        });
      }
    }
  },
  data () {
    return {
      keyName: this.objKey
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
