<template>
  <div :class="['jf-form-item', { 'jf-form-item-hasLabel': !noLabel } ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div 
        v-for="(item, index) in objVal"
        :key="index">
        <the-input
          :objKey="getObjKey(index)" 
          :objVal="getObjVal(index)"
          :validateObj="getValidateObj(index)"
          :keyArr="[index]"
          parentName="TheAddInput"
          :rules="rules.childRule"
          :noLabel="true"
          :EVENT_BUS="EVENT_BUS">
          <div style="margin-left: 8px">
            <Button @click="del(index)" type="warning">删除</Button>
          </div>
        </the-input>
      </div>
      <div class="jf-form-item-error-tip" v-if="showValidate">{{validateInfo}}</div> 
      <div style="text-align: right; margin-top: 10px; margin-bottom: 10px;">
        <Button @click="add" type="primary">{{addText || '添加'}}</Button>
      </div>  
    </div>
  </div>
</template>

<script>
// 使用index作为key,假设当前有两个input,
// 删除第一个input,这时重新渲染，原来的第二个input的index就变成了0，和之前第一个input的key相同
// 虚拟dom比较两个key相同，就会把第一个input保留，而把第二个input删除
// 但是store中删除的数据却是第一个input的数据，暴露了第二个input的输入数据
// 这时我们传递过去的objVal就变成了store中数组的第0项，也就是第二个input的输入数据
// 在the-input组件中如果在data中获取objVal，只会在创建的时候获取
// 所以想要拿到新的objVal，需要在computed中获取
// 所以最终的结果就是删除第一个input,结果把第二个input给删除了，
// 但是我们把第二个input的数据传给了第一个input，所以看起来像是我们删除了第一个input

// 不推荐使用index作为key,比如向数组中插入一项，
// 按理说应该只会渲染插入的那一项，其他的应该不变，
// 但是插入了一项之后，原来的index就发生了变化
// 每一条数据都要重新渲染

// 由于vue中无法检测到对象属性的添加或者删除，以及数组索引的更改，
// 所以这里会遇到问题，子组件input的v-model无法被检测
import TheInput from './TheInput';
import Button from './button';
import schema from 'async-validator';

//mixin
import Base from '../mixins/base';
import Validate from '../mixins/validate';

export default {
  name: 'TheAddInput',
  mixins: [Base, Validate],
  components: {
    TheInput,
    Button
  },
  props: ['title', 'objKey', 'objVal', 'noLabel', 'rules', 'addDefault', 'addText', 'EVENT_BUS'],
  created() {
    this.$props.EVENT_BUS.$on('on-input-validate', obj => {
      if(obj.parentName !== 'TheAddInput') return;
      this.validateArray.splice(obj.keyArr[0], 1, obj.validateObj);
      return false;
    })
  },
  methods: {
    // 使用index做key会带来一些列的问题，所以使用shortid为数组的每一项生成唯一的id
    // 但是这样会导致每次输入都会产生新的key，和上次的key不一样，所以input会失去焦点
    // 最终解决方案，在父组件保存子组件的校验状态，子组件校验的时候通知父组件，然后父组件把状态传给子组件
    getValidateObj(index) {
      return this.validateArray[index] || {
        validateState: '',
        validateMessage: ''
      };
    },
    getObjKey(index) {
      return this.keyName.concat([index]);
    },
    getObjVal(index) {
      return this.msg[index];
    },
    add() {
      this.msg.push(this.addDefault)
    },
    // 删除的时候应该做点什么，这里可能有坑
    del(index) {
      const newVal = this.msg.filter((item, idx) => {
        return idx !== index;
      });
      this.validateArray.splice(index, 1);
      this.msg = newVal;
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
<style scoped>
</style>
