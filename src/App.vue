<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p
        v-for="(item, index) in test"
        :key="item.id"
    >
        <span @click="del(index)">{{item.val}}</span>
        <input type="text" />
    </p>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods: {
      del(index) {
        //   this.test = [1,3,2];
          this.test.splice(index, 1);
      }
  },
  data() {
      return {
          index: 0,
          test: [{
              id:1,
              val: 1
          }, {
              id: 2,
              val: 2
          }, {
              id: 3,
              val: 3
          }]
      }
  }
}
</script>

<style>
*, :after, :before {
    box-sizing: border-box;
}
[type=checkbox], [type=radio] {
    box-sizing: border-box;
    padding: 0;
}
[type=reset], [type=submit], button, html [type=button] {
    -webkit-appearance: button;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.jf-form-item {
  margin-bottom: 24px;
}
.jf-form .jf-form-item-label {
  width: 80px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: #495060;
  line-height: 1;
  padding: 10px 12px 10px 0;
  box-sizing: border-box;
}
.jf-form-item-content {
    position: relative;
    line-height: 32px;
    font-size: 12px;
    margin-left: 80px;
}
.jf-input-wrapper {
    display: inline-block;
    width: 100%;
    position: relative;
    vertical-align: middle;
    line-height: normal;
}
.jf-input {
    display: inline-block;
    /* width: 100%; */
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
.jf-input:focus {
    outline: 0;
    box-shadow: 0 0 0 2px rgba(45,140,240,.2);
}
.jf-input:focus, .jf-input:hover {
    border-color: #57a3f3;
}

</style>
