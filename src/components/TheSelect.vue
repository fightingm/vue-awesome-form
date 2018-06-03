<template>
  <div class="ivu-form-item">
    <label v-if="!inTable" class="ivu-form-item-label">{{title}}</label>
    <div class="ivu-form-item-content">
      <div class="ivu-select ivu-select-single">
        <div tabindex="0" class="ivu-select-selection">
          <input type="hidden" value="shanghai">
          <div>
            <span class="ivu-select-selected-value">London</span>
            <i class="ivu-icon ivu-icon-arrow-down-b ivu-select-arrow">🔽</i>
          </div>
        </div>
        <div class="ivu-select-dropdown" x-placement="bottom">
            <ul class="ivu-select-dropdown-list">
              <li
                v-for="(item, index) in options"
                :key="index"
                :class="[
                  'ivu-select-item',
                  'ivu-select-item-focus',
                  { 'ivu-select-item-selected': item.value === msg }
                ]"
              >{{item.label}}</li>
            </ul>
        </div>
      </div>
    </div>
    <!-- <select v-model="msg">
      <option 
        v-for="(item, index) in options"
        :key="index"
        :value="item.value">{{item.label}}</option>
    </select> -->
  </div>
</template>

<script>

export default {
  name: 'TheSelect',
  props: ["options", 'title', 'objKey', 'objVal', 'inTable'],
  computed: {
    msg: {
      get () {
        return this.objVal;
        // return this.keyName.reduce((pre, cur) => {
        //         return pre[cur];
        //       }, this.$store.state.formValue)
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
      // options: this.options
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ivu-select {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    color: #495060;
    font-size: 14px;
    line-height: normal;
}
.ivu-select-selection {
    display: block;
    box-sizing: border-box;
    outline: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dddee1;
    transition: all .2s ease-in-out;
}
.ivu-select-single .ivu-select-selection {
    height: 32px;
    position: relative;
}
.ivu-select-dropdown {
    width: 308px;
    transform-origin: center top 0px;
    will-change: top, left;
    top: 33px;
    left: 0px;
    display: none;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    padding: 5px 0;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    position: absolute;
    z-index: 900;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 8px;
    padding-right: 24px;
}
.ivu-select-arrow {
    position: absolute;
    top: 50%;
    right: 8px;
    line-height: 1;
    margin-top: -7px;
    font-size: 14px;
    color: #80848f;
    transition: all .2s ease-in-out;
}
.ivu-article .ivu-select ul {
    padding-left: 0!important;
    list-style-type: none;
}
.ivu-select-dropdown-list {
    min-width: 100%;
    list-style: none;
}
.ivu-article .ivu-select li {
    margin-bottom: 0;
}
.ivu-select-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #495060;
    font-size: 12px!important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    transition: background .2s ease-in-out;
}
.ivu-select-item-selected.ivu-select-item-focus {
    background: rgba(40,123,211,.91);
}
.ivu-select-item-selected, .ivu-select-item-selected:hover {
    color: #fff;
    background: rgba(45,140,240,.9);
}
.ivu-select-item-focus, .ivu-select-item:hover {
    background: #f3f3f3;
}
</style>
