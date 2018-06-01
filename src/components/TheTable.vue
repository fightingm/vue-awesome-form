<template>
  <div>
    {{title}}: 

    <div class="ivu-table-wrapper">
      <div class="ivu-table ivu-table-border">
        <table cellspacing="0" cellpadding="0" border="0">
          <thead class="ivu-table-header">
            <th
              v-for="(val, key, index) in orderColumns"
              :key="index"
            >{{val.title}}</th>
            <th>编辑</th>
          </thead>
          <tr
            v-for="(item, index) in objVal"
            :key="index">
            <td
              v-for="(val, key, idx) in orderColumns"
              :key="idx">
              <div class="ivu-table-cell">
                <component 
                  :is="val.type" 
                  :objKey="getObjKey(index, key)" 
                  :objVal="getObjVal(index, key)"
                  :inTable="true" 
                  v-bind="val"></component>
              </div>
            </td>
            <td>
              <button @click="del(index)">删除</button>
            </td>
          </tr>
        </table>
      </div> 
    </div>
    
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
  .ivu-table-wrapper {
      position: relative;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
  }
  .ivu-table {
    width: inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: #495060;
    font-size: 12px;
    background-color: #fff;
    box-sizing: border-box;
}
.ivu-table table {
  width: 100%;
}
.ivu-table:after, .ivu-table:before {
    content: "";
    position: absolute;
    background-color: #dddee1;
}
.ivu-table:before {
    width: 100%;
    height: 1px;
    left: 0;
    bottom: 0;
    z-index: 1;
}
.ivu-table-header {
    overflow: hidden;
}
.ivu-table th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
}
.ivu-table-border td, .ivu-table-border th {
    border-right: 1px solid #e9eaec;
}
.ivu-table td {
    background-color: #fff;
    transition: background-color .2s ease-in-out;
}
.ivu-table td, .ivu-table th {
    min-width: 0;
    height: 48px;
    box-sizing: border-box;
    text-align: left;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #e9eaec;
}
.ivu-table-cell {
    padding-left: 18px;
    padding-right: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    box-sizing: border-box;
}
</style>
