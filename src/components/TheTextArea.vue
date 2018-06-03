<template>
  <div class="jf-form-item">
    <label class="jf-form-item-label" v-if="!inTable">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-input-wrapper jf-input-type">
        <textarea v-model="msg" wrap="soft" autocomplete="off" spellcheck="false" rows="2" class="jf-input"></textarea>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'TheTextArea',
  props: ['title', 'objKey', 'objVal', 'inTable'],
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
  data () {
    return {
      keyName: this.objKey
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
