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
        this.dispatch('SchemaForm', 'on-set-form-data', {
          key: this.keyName,
          value
        });
        // this.$store.commit('setFormData', {
        //   key: this.keyName,
        //   value
        // });
      }
    }
  },
  mounted() {
    this.dispatch('SchemaForm', 'on-form-item-add', this);
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
