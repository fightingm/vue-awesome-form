<template>
  <div :class="['jf-form-item', noLabel ? 'jf-form-item-noLabel' : 'jf-form-item-hasLabel' ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-input-wrapper jf-input-type">
        <textarea v-model="msg" wrap="soft" autocomplete="off" spellcheck="false" rows="2" class="jf-input" @blur="handleBlur"></textarea>
      </div>
      <div class="jf-form-item-error-tip" v-if="showValidate">{{validateInfo}}</div>    
    </div>
  </div>
</template>

<script>

import Emitter from '../emitter';
import Validate from '../validate';

export default {
  name: 'TheTextarea',
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
<style>
  @import "../styles/input.css";
</style>
