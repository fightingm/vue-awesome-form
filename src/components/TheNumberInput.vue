<template>
  <the-input v-bind="$props" theFormat="number"></the-input>
</template>

<script>
import TheInput from './TheInput';

export default {
  name: 'TheNumberInput',
  components: {
    TheInput
  },
  props: ['title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName', 'EVENT_BUS'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
