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
        <Button @click="del(index)" type="warning">删除</Button>
      </the-input>
      <!-- <input type="text" :value="item" @input="handleInput(index, $event)" > -->
      
      
    </div>
    <Button @click="add" type="primary">添加</Button>
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
import TheInput from './TheInput';
import Button from './button'

export default {
  name: 'TheAddInput',
  components: {
    TheInput,
    Button
  },
  props: ['title', 'objKey', 'objVal'],
  computed: {
    curVal() {
       return this.keyName.reduce((pre, cur) => {
                return pre[cur];
              }, this.$store.state.formValue)
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
      this.$store.commit('setFormData', {
        key: this.keyName,
        value
      });
    }
  },
  data () {
    return {
      keyName: this.objKey
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
