<template>
  <div :class="['jf-form-item', { 'jf-form-item-hasLabel': !noLabel } ]">
    <label class="jf-form-item-label">{{title}}</label> 
    <div class="jf-form-item-content">
      <div class="jf-table-wrapper">
        <div class="jf-table jf-table-border">
          <table cellspacing="0" cellpadding="0" border="0">
            <thead class="jf-table-header">
              <th
                v-for="(item, index) in orderColumns"
                :key="index"
              >{{item.val.title}}</th>
              <th>编辑</th>
            </thead>
            <tr
              v-for="(item, index) in objVal"
              :key="index">
              <td
                v-for="(col, idx) in orderColumns"
                :key="idx">
                <div class="jf-table-cell">
                  <component 
                    :is="col.val.type" 
                    :objKey="getObjKey(index, col.key)" 
                    :objVal="getObjVal(index, col.key)"
                    :validateObj="getValidateObj(index, col.key)"
                    :keyArr="[index, col.key]"
                    parentName="TheTable"
                    :noLabel="true" 
                    v-bind="col.val"></component>
                </div>
              </td>
              <td>
                <Button @click="del(index)" type="error">删除</Button>
              </td>
            </tr>
          </table>
        </div> 
      </div>
      <div class="jf-form-item-error-tip" v-if="showValidate">{{validateInfo}}</div>      
    </div>
    <div style="text-align: right; margin-top: 10px;">
      <Button @click="add" type="primary">{{addText || 添加一行}}</Button>
    </div>
  </div>
</template>

<script>
import TheInput from './TheInput';
import ThePassInput from './ThePassInput';
import TheNumberInput from './TheNumberInput';
import TheTextArea from './TheTextArea';
import TheSelect from './TheSelect';
import TheRadio from './TheRadio';
import TheCheckbox from './TheCheckbox';
import Button from './button';
import schema from 'async-validator';

// utils
import { orderProperty, EventBus } from '../utils'

//mixin
import Base from '../mixins/base';
import Validate from '../mixins/validate';

export default {
  name: 'TheTable',
  mixins: [Base, Validate],
  components: {
    TheInput,
    ThePassInput,
    TheNumberInput,
    TheTextArea,
    TheSelect,
    TheRadio,
    TheCheckbox,
    Button
  },
  props: ['title', 'objKey', 'objVal', "addDefault", "addText", "columns", "noLabel", "rules"],
  computed: {
    msg() {
      return this.objVal;
      //  return this.keyName.reduce((pre, cur) => {
      //           return pre[cur];
      //         }, this.$store.state.formValue)
    },
    orderColumns() {
      return orderProperty(this.columns);
    }
  },
  created() {
    EventBus.$on('on-input-validate', obj => {
      if(obj.parentName !== 'TheTable') return;
      obj.keyArr.reduce((pre, cur, curIndex, arr) => {
        if(curIndex === arr.length - 1) {
          if(typeof(cur) === 'number') {
              return pre.splice(cur, 1, value);
          } else {
              return pre[cur] = obj.validateObj;
          }
        }
        return pre[cur] = pre[cur] || {}
      }, this.validateArray);
      return false;
    })
  },
  methods: {
    getValidateObj(index, key) {
      if(!this.validateArray[index]) {
        this.$set(this.validateArray, index, {});
      }
      if(!this.validateArray[index][key]) {
        this.$set(this.validateArray[index], key, {
          validateState: '',
          validateMessage: ''
        })
      }
      return this.validateArray[index][key];
    },
    getObjKey(index, key) {
      return this.keyName.concat([index, key]);
    },
    getObjVal(index, key) {
      return this.msg[index][key];
    },
    add() {
      // 这里一定要特别注意不能直接concat addDefault
      // 如果直接传递addDefault，后面的每一个store保存的都是同一个对象
      // 新增的每一项状态都会共享
      // 下面这种方式是一种浅拷贝
      const newAdd = {
        ...this.addDefault
      };
      const newVal = this.msg.concat([newAdd]);
      this.setFormData(newVal);
    },
    del(index) {
      const newVal = this.msg.filter((item, idx) => {
        return idx !== index;
      });
      this.validateArray.splice(index, 1);
      this.setFormData(newVal);
    },
    setFormData(value) {
      EventBus.$emit('on-set-form-data', {
        key: this.keyName,
        value
      });
    }
  },
  data () {
    return {
      keyName: this.objKey,
      validateState: '',
      validateMessage: '',
      validateArray: []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss">
  @import "../styles/table.css";
</style>
