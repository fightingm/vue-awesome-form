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
import schema from 'async-validator';
import Emitter from '../emitter';

export default {
  name: 'TheInput',
  mixins: [ Emitter ],
  props: ['title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName'],
  computed: {
    msg: {
      get: function() {
        return this.objVal;
      },
      set: function(value) {
        console.log('value', value);
        this.$store.commit('setFormData', {
          key: this.keyName,
          value
        });
      }
    },
    showValidate() {
      if(this.validateObj !== undefined) {
        return this.validateObj.validateState === 'error'
      } else {
        return this.validateState === 'error'
      }
    },
    validateInfo() {
      if(this.validateObj !== undefined) {
        return this.validateObj.validateMessage
      } else {
        return this.validateMessage
      }
    }
  },
  mounted() {
    this.dispatch('HelloWorld', 'on-form-item-add', this);
    // this.dispatch('TheAddInput', 'on-input-add', this);
  },
  methods: {
    handleBlur(e) {
      const val = e.target.value;
      this.validate();
      // this.dispatch('HelloWorld', 'on-form-blur', val);
    },
    validate() {
      if(!this.rules) return;
      var descriptor = {
        name: this.rules
      };
      var validator = new schema(descriptor);
      validator.validate({name: this.msg}, (err, fields) => {
        let state = !err ? 'success' : 'error';
        let msg = err ? err[0].message : '';
        if(this.validateObj !== undefined) {
          this.dispatch(this.parentName, 'on-input-validate', {
            // index: this.keyIndex,
            keyArr: this.keyArr,
            validateObj: {
              validateState: state,
              validateMessage: msg
            }
          });
        }else {
          this.validateState = state;
          this.validateMessage = msg;
        }
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
