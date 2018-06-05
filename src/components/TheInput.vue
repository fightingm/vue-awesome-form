<template>
  <div :class="['jf-form-item', noLabel ? 'jf-form-item-noLabel' : 'jf-form-item-hasLabel' ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-input-wrapper jf-input-type">
        <input class="jf-input" type="text" v-model="msg" @blur="handleBlur">
        {{msg}}
        <slot></slot>
      </div>
      <div class="jf-form-item-error-tip" v-if="validateState === 'error'">{{validateMessage}}</div>
    </div>
  </div>
</template>

<script>
import schema from 'async-validator';
import Emitter from '../emitter';

export default {
  name: 'TheInput',
  mixins: [ Emitter ],
  props: ['title', 'objKey', 'objVal', 'noLabel', 'rules'],
  computed: {
    msg: {
      get: function() {
        console.log('22222');
        return this.objVal;
        // return this.keyName.reduce((pre, cur) => {
        //         return pre[cur];
        //       }, this.$store.state.formValue)
      },
      set: function(value) {
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
    handleBlur(e) {
      const val = e.target.value;
      // this.validate();
      // this.dispatch('HelloWorld', 'on-form-blur', val);
    },
    validate() {
      if(!this.rules) return;
      var descriptor = {
        name: this.rules
      };
      console.log('msg', this.msg);
      var validator = new schema(descriptor);
      validator.validate({name: this.msg}, (err, fields) => {
        this.validateState = !err ? 'success' : 'error';
        this.validateMessage = err ? err[0].message : '';
      })
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

</style>
