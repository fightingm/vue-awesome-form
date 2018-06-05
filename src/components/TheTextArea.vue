<template>
  <div :class="['jf-form-item', { 'jf-form-item-hasLabel': !noLabel } ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-input-wrapper jf-input-type">
        <textarea v-model="msg" wrap="soft" autocomplete="off" spellcheck="false" rows="2" class="jf-input"></textarea>
      </div>
      <div class="jf-form-item-error-tip" v-if="validateState === 'error'">{{validateMessage}}</div>      
    </div>
  </div>
</template>

<script>
import schema from 'async-validator';
import Emitter from '../emitter';

export default {
  name: 'TheTextArea',
  mixins: [ Emitter ],
  props: ['title', 'objKey', 'objVal', 'noLabel', 'rules'],
  computed: {
    msg: {
      get () {
        return this.keyName.reduce((pre, cur) => {
                return pre[cur];
              }, this.$store.state.formValue)
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
  textarea.jf-input {
      max-width: 100%;
      height: auto;
      vertical-align: bottom;
      font-size: 14px;
      min-height: 52px;
  }
</style>
