<template>
  <div :class="['jf-form-item', { 'jf-form-item-hasLabel': !noLabel } ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-checkbox-group">
        <label
          v-for="(item, index) in options"
          :key="index"
          :class="['jf-checkbox-wrapper', 'jf-checkbox-group-item', { 'jf-checkbox-wrapper-checked': msg.indexOf(item.value) !== -1 }]"
          @change="handleChange">
          <span :class="['jf-checkbox', { 'jf-checkbox-checked': msg.indexOf(item.value) !== -1 }]">
            <span class="jf-checkbox-inner"></span>
            <input type="checkbox" class="jf-checkbox-input" :value="item.value" v-model="msg">
          </span>
          <span>{{item.label}}</span>
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
  name: 'TheCheckbox',
  mixins: [ Emitter, Validate ],
  props: ["options", 'title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName'],
  computed: {
    msg: {
      get () {
        return this.objVal;
      },
      set (value) {
        this.dispatch('HelloWorld', 'on-set-form-data', {
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
<style scoped>
.jf-checkbox-group {
    font-size: 14px;
}
.jf-checkbox-group-item, .jf-switch {
    display: inline-block;
}
.jf-checkbox-wrapper {
    cursor: pointer;
    font-size: 12px;
    display: inline-block;
    margin-right: 8px;
}
.jf-checkbox {
    display: inline-block;
    vertical-align: middle;
    white-space: nowrap;
    cursor: pointer;
    line-height: 1;
    position: relative;
}
.jf-checkbox-inner {
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    top: 0;
    left: 0;
    border: 1px solid #dddee1;
    border-radius: 2px;
    background-color: #fff;
    transition: border-color .2s ease-in-out,background-color .2s ease-in-out,box-shadow .2s ease-in-out;
}
.jf-checkbox-checked .jf-checkbox-inner {
    border-color: #2d8cf0;
    background-color: #2d8cf0;
}
.jf-checkbox-input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    cursor: pointer;
    opacity: 0;
}
.jf-checkbox-inner:after {
    content: "";
    display: table;
    width: 4px;
    height: 8px;
    position: absolute;
    top: 1px;
    left: 4px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    -webkit-transform: rotate(45deg) scale(0);
    transform: rotate(45deg) scale(0);
    transition: all .2s ease-in-out;
}
.jf-checkbox-checked .jf-checkbox-inner:after {
    content: "";
    display: table;
    width: 4px;
    height: 8px;
    position: absolute;
    top: 1px;
    left: 4px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    -webkit-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    transition: all .2s ease-in-out;
}
.jf-checkbox+span, .jf-checkbox-wrapper+span {
    margin-right: 4px;
}
</style>
