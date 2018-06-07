<template>
  <div>
    <h2 :style="{fontSize: calcSize}">{{title}}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TheTitle',
  props: ['title', 'level'],
  data () {
    return {
      keyName: this.objKey
    }
  },
  computed: {
    calcSize() {
      return Math.max(24 - (this.level - 1) * 4, 12) + 'px';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
