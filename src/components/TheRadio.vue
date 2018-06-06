<template>
  <div :class="['jf-form-item', { 'jf-form-item-hasLabel': !noLabel } ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-radio-group">
        <label 
          v-for="(item, index) in options"
          :key="index"
          :class="['jf-radio-wrapper', 'jf-radio-group-item', { 'jf-radio-wrapper-checked': item.value === msg }]"
          @change="handleChange">
          <span :class="['jf-radio', { 'jf-radio-checked': item.value === msg }]">
            <span class="jf-radio-inner"></span> 
            <input type="radio" class="jf-radio-input" :value="item.value" v-model="msg">
          </span>
          {{item.label}}
        </label>
      </div>
      <div class="jf-form-item-error-tip" v-if="showValidate">{{validateInfo}}</div>    
    </div>
  </div>
</template>

<script>

import Emitter from '../emitter';
import Validate from '../validate';

export default {
  name: 'TheRadio',
  mixins: [ Emitter, Validate ],
  props: ["options", 'title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName'],
  computed: {
    msg: {
      get () {
        return this.objVal;
      },
      set (value) {
        this.$store.commit('setFormData', {
          key: this.keyName,
          value
        });
      }
    }
  },
  mounted() {
    this.dispatch('HelloWorld', 'on-form-item-add', this);
  },
  methods: {
    handleChange() {
      this.asyncValidate();
    }
  },
  data () {
    return {
      keyName: this.objKey,
      validateState: '',
      validateMessage: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="postcss">


.jf-radio-group {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
}
.jf-radio-wrapper {
    font-size: 12px;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    white-space: nowrap;
    margin-right: 8px;
    cursor: pointer;
}
.jf-radio {
    display: inline-block;
    margin-right: 4px;
    white-space: nowrap;
    position: relative;
    line-height: 1;
    vertical-align: middle;
    cursor: pointer;
}
.jf-radio-inner {
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    top: 0;
    left: 0;
    background-color: #fff;
    border: 1px solid #dddee1;
    border-radius: 50%;
    transition: all .2s ease-in-out;
    &:after {
      position: absolute;
      width: 8px;
      height: 8px;
      left: 2px;
      top: 2px;
      border-radius: 6px;
      display: table;
      border-top: 0;
      border-left: 0;
      content: " ";
      background-color: #2d8cf0;
      opacity: 0;
      transition: all .2s ease-in-out;
      transform: scale(0);
    }
}
.jf-radio-checked .jf-radio-inner {
    border-color: #2d8cf0;
    &:after {
      opacity: 1;
      transform: scale(1);
      transition: all .2s ease-in-out;
    }
}
.jf-radio-input {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
}
</style>
