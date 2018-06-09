<template>
  <form class="jf-form">
    <the-tree
      v-for="item in orderProperty(schema)"
      :key="item.key"
      :objKey="[item.key]"
      :objVal="formValue[item.key]"
      v-bind="item.val"></the-tree>
    <!-- <div style="text-align: center; margin-top: 10px;">
      <Button @click="handleReset" type="warning">重置</Button>
      <Button @click="handleSubmit" type="primary">提交</Button>
    </div> -->
  </form>
</template>

<script>
import TheTree from './TheTree';
import Button from './button'
import schema from 'async-validator';
// 表单验证这里参考iview的做法，通过mixin的方式将事件emitter注入到每个组件
// 通过事件的广播与派发，input组件blur之后向上dispatch事件，
// 然后在根组件统一负责表单的验证
export default {
  name: 'SchemaForm',
  components: {
    TheTree,
    Button
  },
  props: ['schema', 'value'],
  created() {
    // store.commit('initFormData', {
    //   value: this.formData.value
    // });
    this.initFormData(this.value);
    this.$on('on-form-item-add', field => {
      if(field) this.fields.push(field);
      return false;
    });
    this.$on('on-form-item-remove', (field) => {
      if (field) this.fields.splice(this.fields.indexOf(field), 1);
      return false;
    });
    this.$on('on-set-form-data', payload => {
      this.setFormData(payload);
    });
  },
  methods: {
    initFormData(value) {
        this.formValue = this.cloneDeep(value);
    },
    cloneDeep(source) {
      // 只适用于对象中没有函数
      return JSON.parse(JSON.stringify(source));
      // var type = Object.prototype.toString.call(source);
      // let obj;
      // if(type === '[object Array]'){
      //     obj = [];
      // } else if(type === '[object Object]'){
      //     obj = {};
      // } else {
      //     //不再具有下一层次
      //     return source;
      // }
      // if(type === '[object Array]'){
      //     for(let i = 0, len = source.length; i < len; i++){
      //         obj.push(this.cloneDeep(source[i]));
      //     }
      // } else if(type === '[object Object]'){
      //     for(let key in source){
      //         obj[key] = this.cloneDeep(source[key]);
      //     }
      // }
      // return obj;
    },
    setFormData(payload) {
        const { key, value } = payload;
        key.reduce((pre, cur, curIndex, arr) => {
            // 如果是最后一项，就是我们要改变的字段
            if(curIndex === arr.length - 1) {
                // Vue 不能检测直接用索引设置数组某一项的值
                if(typeof(cur) === 'number') {
                    return pre.splice(cur, 1, value);
                } else {
                    return pre[cur] = value;
                }
            }
            return pre[cur] = pre[cur] || {}
        }, this.formValue);
    },
    validate(cb) {
      let err = false;
      let len = this.fields.length;
      this.fields.forEach((field, index) => {
        field.validate().then(res => {
          const { title, status } = res;
          if(!status) {
            err = true;
          }
          if((index + 1) === len) {
            cb(err, this.formValue);
          }
        }).catch(err => {
          console.log(err);
        })
      })
    },
    // handleSubmit() {
    //   this.validate(valid => {
    //     if(valid) {
    //       console.log('验证成功', this.formValue);
    //     }else {
    //       console.log('验证失败');
    //     }
    //   });
    // },
    // 三种思路，第一种方式在每个组件保存初始值，reset的时候循环调用每一个reset事件
    // 第二种思路，根组件保存一个深拷贝的初始值，然后统一reset
    // 第二种思路只能恢复初始值，没法处理组件内的状态，比如校验信息
    // 第三种思路结合两种思路，在根组件reset数据，在每个组件内部处理自己的状态
    resetFields() {
      this.initFormData(this.value);
      this.fields.forEach(field => {
        field.resetField && field.resetField();
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
      });
      // .reduce((pre, cur) => {
      //   pre[cur.key] = cur.val;
      //   return pre;
      // }, {});
    },
    onFieldBlur() {
      console.log(arguments);
    }
  },
  mounted() {
    this.$on('on-form-blur', this.onFieldBlur);
  },
  data () {
    return {
      "initFormValue": {},
      "formValue": {},
      "fields": []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss">
  @import "../styles/base.css";
</style>
