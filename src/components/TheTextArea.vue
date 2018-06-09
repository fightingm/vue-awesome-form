<template>
  <the-input v-bind="$props" theFormat="textarea"></the-input>
</template>

<script>

import TheInput from './TheInput';

export default {
  name: 'TheTextarea',
  components: {
    TheInput
  },
  props: ['title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
