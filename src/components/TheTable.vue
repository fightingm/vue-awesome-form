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
                    :validateObj="getValidateObj(index, key)"
                    :keyArr="[index, key]"
                    parentName="TheTable"
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
      <div class="jf-form-item-error-tip" v-if="validateState === 'error'">{{validateMessage}}</div>        
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
import Button from './button';
import schema from 'async-validator';
import Emitter from '../emitter';

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
  mixins: [ Emitter ],
  props: ['title', 'objKey', 'objVal', "addDefault", "columns", "noLabel", "rules"],
  computed: {
    curVal() {
      return this.objVal;
      //  return this.keyName.reduce((pre, cur) => {
      //           return pre[cur];
      //         }, this.$store.state.formValue)
    },
    orderColumns() {
      return this.orderProperty(this.columns);
    }
  },
  created() {
    this.$on('on-input-validate', obj => {
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
      // this.validateArray[obj.index][obj.key] = obj.validateObj;
      // this.validateArray.splice(obj.index, 1, obj);
      return false;
    })
  },
  mounted() {
    this.dispatch('SchemaForm', 'on-form-item-add', this);
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
      this.validateArray.splice(index, 1);
      this.setFormData(newVal);
    },
    setFormData(value) {
      this.dispatch('SchemaForm', 'on-set-form-data', {
        key: this.keyName,
        value
      });
      // this.$store.commit('setFormData', {
      //   key: this.keyName,
      //   value
      // });
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
    },
    validate() {
      return new Promise((resolve, reject) => {
        if(!this.rules) reject('norule');
        var descriptor = {
          name: this.rules
        };
        var validator = new schema(descriptor);
        validator.validate({name: this.objVal}, (err, fields) => {
          this.validateState = !err ? 'success' : 'error';
          this.validateMessage = err ? err[0].message : '';
          if(err) {
            resolve({
              title: this.title,
              status: false
            })
          }else {
            resolve({
              title: this.title,
              status: true
            })
          }
        })
      })
      
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
