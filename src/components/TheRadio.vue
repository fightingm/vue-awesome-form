<template>
  <div :class="['jf-form-item', { 'jf-form-item-hasLabel': !noLabel } ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-radio-group">
        <label 
          v-for="item in options"
          :key="item.value"
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

import EventBus from '../eventBus';
//mixin
import Base from '../mixins/base';
import Validate from '../mixins/validate';

export default {
  name: 'TheRadio',
  mixins: [ Validate, Base ],
  props: ["options", 'title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName'],
  computed: {
    msg: {
      get () {
        return this.objVal;
      },
      set (value) {
        EventBus.$emit('on-set-form-data', {
          key: this.keyName,
          value
        });
      }
    }
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

<style lang="postcss">
  @import "../styles/radio.css";
</style>
