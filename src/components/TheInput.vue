<template>
  <div :class="['jf-form-item', noLabel ? 'jf-form-item-noLabel' : 'jf-form-item-hasLabel' ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-input-wrapper jf-input-type">
        <textarea v-if="theFormat === 'textarea'" v-model="msg" wrap="soft" autocomplete="off" spellcheck="false" rows="2" class="jf-input" @blur="handleBlur"></textarea>
        <input v-else class="jf-input" :type="theFormat || 'text'" v-model="msg" @blur="handleBlur">
        <slot></slot>
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
  name: 'TheInput',
  mixins: [ Validate, Base ],
  props: ['title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName', 'theFormat'],
  computed: {
    msg: {
      get: function() {
        return this.objVal;
      },
      set: function(value) {
        EventBus.$emit('on-set-form-data', {
          key: this.keyName,
          value
        });
      }
    }
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
