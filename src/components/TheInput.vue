<template>
  <div :class="['jf-form-item', noLabel ? 'jf-form-item-noLabel' : 'jf-form-item-hasLabel' ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-input-wrapper jf-input-type">
        <input class="jf-input" type="text" v-model="msg" @blur="handleBlur">
        <slot></slot>
      </div>
      <div class="jf-form-item-error-tip" v-if="showValidate">{{validateInfo}}</div>
    </div>
  </div>
</template>

<script>

import Emitter from '../emitter';
import Validate from '../validate';

export default {
  name: 'TheInput',
  mixins: [ Emitter, Validate ],
  props: ['title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName'],
  computed: {
    msg: {
      get: function() {
        return this.objVal;
      },
      set: function(value) {
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
    // Object.defineProperty(this, 'initialValue', {
    //     value: this.msg
    // });
    // 下面这种做法会抛出警告
    // this.$set(this, 'initialValue', this.msg);
  },
  methods: {
    handleBlur(e) {
      const val = e.target.value;
      this.validate();
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
  @import "../styles/input.css";
</style>
