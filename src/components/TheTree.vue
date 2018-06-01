<template>
  <div>
    <component :is="model.type" :objKey="objKey" :objVal="objVal" v-bind="model"></component>
    <div v-if="model.properties">
      <the-tree
        v-for="(val, key, index) in model.properties"
        :key="index"
        :objKey="getObjKeys(objKey, key)"
        :objVal="getObjVal(key)"
        :model="val"
      ></the-tree>
    </div>
  </div>
</template>

<script>
import { store } from '../store'

import TheTitle from './TheTitle';
import TheInput from './TheInput';
import TheTextArea from './TheTextArea';
import TheSelect from './TheSelect';
import TheRadio from './TheRadio';
import TheCheckbox from './TheCheckbox';
import TheAddInput from './TheAddInput';
import TheTable from './TheTable';


export default {
  name: 'TheTree',
  components: {
    TheTitle,
    TheInput,
    TheTextArea,
    TheSelect,
    TheRadio,
    TheCheckbox,
    TheAddInput,
    TheTable
  },
  props: ['model', 'objKey', 'objVal'],
  methods: {
    getObjVal(key) {
      return this.objVal[key];
    },
    getObjKeys(oldKeys, newKey) {
      if(Array.isArray(oldKeys)) {
        // ！！！这里要用concat,而不是push
        return oldKeys.concat([newKey]);
      } else {
        return [oldKeys, newKey];
      }
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
