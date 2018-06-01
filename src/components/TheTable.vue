<template>
  <div>
    {{title}}: 
    <table>
      <thead>
        <th
          v-for="(val, key, index) in orderColumns"
          :key="index"
        >{{val.title}}</th>
      </thead>
      <tr
        v-for="(item, index) in objVal"
        :key="index">
        <td
          v-for="(val, key, idx) in orderColumns"
          :key="idx">
          <component 
            :is="val.type" 
            :objKey="getObjKey(index, key)" 
            :objVal="getObjVal(index, key)"
            :inTable="true" 
            v-bind="val"></component>
          <!-- <the-input title='' :objKey='getObjKey(index, key)' :objVal='getObjVal(index, key)'></the-input> -->
          <!-- <input type="text" :value="val" @input="handleInput(index, $event)" > -->
        </td>
        <td>
          <button @click="del(index)">删除</button>
        </td>
      </tr>
    </table>
    <button @click="add">添加一行</button>
  </div>
</template>

<script>
import { store } from '../store'
import TheInput from './TheInput';
import TheTextArea from './TheTextArea';
import TheSelect from './TheSelect';
import TheRadio from './TheRadio';
import TheCheckbox from './TheCheckbox';

export default {
  name: 'TheTable',
  components: {
    TheInput,
    TheTextArea,
    TheSelect,
    TheRadio,
    TheCheckbox
  },
  props: ['title', 'objKey', 'objVal', "addDefault", "columns"],
  computed: {
    curVal() {
       return this.keyName.reduce((pre, cur) => {
                return pre[cur];
              }, store.state.formValue)
    },
    orderColumns() {
      return this.orderProperty(this.columns);
    }
  },
  methods: {
    getObjKey(index, key) {
      return this.keyName.concat([index, key]);
    },
    getObjVal(index, key) {
      return this.curVal[index][key];
    },
    add() {
      const newVal = this.curVal.concat([this.addDefault]);
      this.setFormData(newVal);
    },
    del(index) {
      const newVal = this.curVal.filter((item, idx) => {
        return idx !== index;
      });
      this.setFormData(newVal);
    },
    setFormData(value) {
      store.commit('setFormData', {
        key: this.keyName,
        value
      });
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
      }).reduce((pre, cur) => {
        pre[cur.key] = cur.val;
        return pre;
      }, {});
    }
  },
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
