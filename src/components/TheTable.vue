<template>
  <div :class="['jf-form-item', { 'jf-form-item-hasLabel': !noLabel } ]">
    <label class="jf-form-item-label">{{title}}</label> 
    <div class="jf-form-item-content">
      <div class="jf-table-wrapper">
        <div class="jf-table jf-table-border">
          <table cellspacing="0" cellpadding="0" border="0">
            <thead class="jf-table-header">
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
                <div class="jf-table-cell">
                  <component 
                    :is="val.type" 
                    :objKey="getObjKey(index, key)" 
                    :objVal="getObjVal(index, key)"
                    :noLabel="true" 
                    v-bind="val"></component>
                </div>
              </td>
              <td>
                <Button @click="del(index)" type="error">删除</Button>
              </td>
            </tr>
          </table>
        </div> 
      </div>
    </div>
    <div style="text-align: right; margin-top: 10px;">
      <Button @click="add" type="primary">添加一行</Button>
    </div>
  </div>
</template>

<script>
import TheInput from './TheInput';
import TheTextArea from './TheTextArea';
import TheSelect from './TheSelect';
import TheRadio from './TheRadio';
import TheCheckbox from './TheCheckbox';
import Button from './button'

export default {
  name: 'TheTable',
  components: {
    TheInput,
    TheTextArea,
    TheSelect,
    TheRadio,
    TheCheckbox,
    Button
  },
  props: ['title', 'objKey', 'objVal', "addDefault", "columns", "noLabel"],
  computed: {
    curVal() {
       return this.keyName.reduce((pre, cur) => {
                return pre[cur];
              }, this.$store.state.formValue)
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
      // 这里一定要特别注意不能直接concat addDefault
      // 如果直接传递addDefault，后面的每一个store保存的都是同一个对象
      // 新增的每一项状态都会共享
      // 下面这种方式是一种浅拷贝
      const newAdd = {
        ...this.addDefault
      };
      const newVal = this.curVal.concat([newAdd]);
      this.setFormData(newVal);
    },
    del(index) {
      const newVal = this.curVal.filter((item, idx) => {
        return idx !== index;
      });
      this.setFormData(newVal);
    },
    setFormData(value) {
      this.$store.commit('setFormData', {
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
<style lang="postcss" scoped>
  .jf-table-wrapper {
      position: relative;
      border: 1px solid #dddee1;
      border-bottom: 0;
      border-right: 0;
  }
  .jf-table {
    width: inherit;
    height: 100%;
    max-width: 100%;
    color: #495060;
    font-size: 12px;
    background-color: #fff;
    box-sizing: border-box;
    & table {
      width: 100%;
      table-layout: fixed;
    }
    &:after, &:before {
      content: "";
      position: absolute;
      background-color: #dddee1;
    }
    &:before {
      width: 100%;
      height: 1px;
      left: 0;
      bottom: 0;
      z-index: 1;
    }
    & th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    & td {
      background-color: #fff;
      transition: background-color .2s ease-in-out;
    }
    & th, & td {
      min-width: 0;
      height: 48px;
      box-sizing: border-box;
      text-align: center;
      text-overflow: ellipsis;
      vertical-align: middle;
      border-bottom: 1px solid #e9eaec;
    }
}
.jf-table-header {
    overflow: hidden;
}
.jf-table-border td, .jf-table-border th {
    border-right: 1px solid #e9eaec;
}
.jf-table-cell {
    padding-left: 18px;
    padding-right: 18px;
    text-overflow: ellipsis;
    white-space: normal;
    word-break: break-all;
    box-sizing: border-box;
    & .jf-form-item {
      margin-bottom: 0;
    }
}
</style>
