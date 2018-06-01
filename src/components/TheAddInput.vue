<template>
  <div>
    {{title}}: 
    <div 
      v-for="(item, index) in objVal"
      :key="index">
      <input type="text" :value="item" @input="handleInput(index, $event)" >
      <button @click="del(index)">删除</button>
    </div>
    <button @click="add">添加</button>
  </div>
</template>

<script>
import { store } from '../store'
export default {
  name: 'TheAddInput',
  props: ['title', 'objKey', 'objVal'],
  watch: {
    msg: function(newVal, oldVal) {
      console.log(newVal. oldVal);
      // store.commit('setFormData', {
      //   key: this.keyName,
      //   value: newVal
      // });
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
    add() {
      const newVal = this.curVal.concat(["test"]);
      this.setFormData(newVal);
    },
    del(index) {
      const newVal = this.curVal.filter((item, idx) => {
        return idx !== index;
      });
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
