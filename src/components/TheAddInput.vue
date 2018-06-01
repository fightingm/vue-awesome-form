<template>
  <div>
    {{title}}: 
    <div 
      v-for="(item, index) in objVal"
      :key="index">
      <the-input 
        :objKey="getObjKey(index)" 
        :objVal="getObjVal(index)"
        :inTable="true">
        {{item}}-{{getObjVal(index)}}
        <Button @click="del(index)" type="warning">删除</Button>
        </the-input>
      <!-- <input type="text" :value="item" @input="handleInput(index, $event)" > -->
      
      
    </div>
    <Button @click="add" type="primary">添加</Button>
  </div>
</template>

<script>
import { store } from '../store'
import TheInput from './TheInput';
import Button from './button'

export default {
  name: 'TheAddInput',
  components: {
    TheInput,
    Button
  },
  props: ['title', 'objKey', 'objVal'],
  watch: {
    msg: function(newVal, oldVal) {
      console.log(newVal. oldVal);
    }
  },
  computed: {
    curVal() {
       return this.keyName.reduce((pre, cur) => {
                return pre[cur];
              }, store.state.formValue)
    }
  },
  methods: {
    getObjKey(index) {
      return this.keyName.concat([index]);
    },
    getObjVal(index) {
      return this.curVal[index];
    },
    add() {
      const newVal = this.curVal.concat([""]);
      this.setFormData(newVal);
    },
    del(index) {
      console.log(index);
      const newVal = this.curVal.filter((item, idx) => {
        return idx !== index;
      });
      console.log(newVal);
      this.setFormData(newVal);
    },
    handleInput(index, e) {
      var value = e.target.value;
      const newVal = this.curVal.map((item, idx) => {
        if(idx === index) {
          return value;
        }
        return item;
      });
      this.setFormData(newVal);
    },
    setFormData(value) {
      store.commit('setFormData', {
        key: this.keyName,
        value
      });
    }
  },
  data () {
    return {
      msg: this.objVal,
      keyName: this.objKey
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
