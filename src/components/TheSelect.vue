<template>
  <div :class="['jf-form-item', { 'jf-form-item-hasLabel': !noLabel } ]">
    <label v-if="!noLabel" class="jf-form-item-label">{{title}}</label>
    <div class="jf-form-item-content">
      <div class="jf-select">
        <div tabindex="0" class="jf-select-selection">
          <input type="hidden" value="shanghai">
          <div @click="toggle">
            <span v-if="selectVal" class="jf-select-selected-value">{{selectVal.label}}</span>
            <span v-else class="jf-select-placeholder">请选择</span>
            <i 
              :class="[
                'jf-select-arrow', 
                { 'jf-select-arrow-up': selectVisible }, 
                { 'jf-select-arrow-down': !selectVisible }
              ]"
            ></i>
          </div>
        </div>
        <transition name="transition-drop">
          <div v-show="selectVisible" class="jf-select-dropdown" x-placement="bottom">
              <ul class="jf-select-dropdown-list">
                <li
                  v-for="item in options"
                  :key="item.value"
                  :class="[
                    'jf-select-item',
                    { 'jf-select-item-selected': item.value === msg }
                  ]"
                  @click="select(item.value)"
                >{{item.label}}</li>
              </ul>
          </div>
        </transition>
      </div>
      <div class="jf-form-item-error-tip" v-if="showValidate">{{validateInfo}}</div>      
    </div>
  </div>
</template>

<script>

//mixin
import Base from '../mixins/base';
import Validate from '../mixins/validate';

export default {
  name: 'TheSelect',
  mixins: [ Validate, Base ],
  props: ["options", 'title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName', 'EVENT_BUS'],
  computed: {
    selectVal () {
        return this.options.filter(item => {
          return item.value === this.objVal;
        })[0];
    }
  },
  methods: {
    toggle() {
      this.selectVisible = !this.selectVisible;
    },
    select(value) {
      if(this.msg !== value) {
        this.msg = value;
      }
      this.toggle();
      // 如果立即执行validate,validate函数中拿到的objVal是当前的objVal，
      // 所以需要在下次 DOM 更新循环结束之后执行验证函数
      this.asyncValidate();
    }
  },
  data () {
    return {
      keyName: this.objKey,
      selectVisible: false,
      validateState: '',
      validateMessage: ''
      // options: this.options
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss">
  @import "../styles/select.css";
</style>
