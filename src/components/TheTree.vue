<template>
  <div class="jf-tree">
    <the-title :title="title" :level="objKey.length"></the-title>
    <div class="jf-tree-item">
      <component
        v-for="item in orderProperty(properties)"
        :key="item.key"
        :is="item.val.type" 
        :objKey="getObjKeys(objKey, item.key)" 
        :objVal="getObjVal(item.key)"
        v-bind="item.val">
      </component>
    </div>
  </div>
</template>

<script>

import TheTitle from './TheTitle';
import TheInput from './TheInput';
import ThePassInput from './ThePassInput';
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
    ThePassInput,
    TheTextArea,
    TheSelect,
    TheRadio,
    TheCheckbox,
    TheAddInput,
    TheTable
  },
  props: ['title', 'properties', 'objKey', 'objVal'],
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
    },
    // 根据propertyOrder 从小到大排序
    orderProperty(oldObj) {
      // 先遍历对象，生成数组
      // 对数组排序
      // 生成一个新的对象
      const keys = Object.keys(oldObj);
      // 如果对象只有一个字段，不需要排序
      if(keys.length <= 1) return oldObj;
      return keys.map(key => {
        return {
          key,
          val: oldObj[key]
        };
      }).sort((pre, cur) => {
        return (pre.val.propertyOrder || 999) - (cur.val.propertyOrder || 999);
      });
      // .reduce((pre, cur) => {
      //   pre[cur.key] = cur.val;
      //   return pre;
      // }, {});
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
<style>
  .jf-tree {
    padding-left: 30px;
  }
</style>
