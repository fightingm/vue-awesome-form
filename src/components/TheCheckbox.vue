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
  @import "../styles/checkbox.css";
</style>
