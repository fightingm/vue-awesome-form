<template>
  <div :class="['jf-form-item', noLabel ? 'jf-form-item-noLabel' : 'jf-form-item-hasLabel' ]">
    <label class="jf-form-item-label" v-if="!noLabel">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-input-wrapper jf-input-type">
        <input class="jf-input" type="text" v-model="msg">
        <slot></slot>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'TheInput',
  props: ['title', 'objKey', 'objVal', 'noLabel'],
  computed: {
    msg: {
      get: function() {
        return this.objVal;
      },
      set: function(value) {
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
</style>
