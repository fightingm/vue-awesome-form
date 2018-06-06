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
                  v-for="(item, index) in options"
                  :key="index"
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
import schema from 'async-validator';
import Emitter from '../emitter';

export default {
  name: 'TheSelect',
  mixins: [ Emitter ],
  props: ["options", 'title', 'objKey', 'objVal', 'noLabel', 'rules', 'validateObj', 'keyArr', 'parentName'],
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
    },
    selectVal () {
        return this.options.filter(item => {
          return item.value === this.objVal;
        })[0];
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
    toggle() {
      this.selectVisible = !this.selectVisible;
    },
    select(value) {
      if(this.msg !== value) {
        this.$store.commit('setFormData', {
          key: this.keyName,
          value
        });
      }
      this.toggle();
      // 如果立即执行validate,validate函数中拿到的objVal是当前的objVal，
      // 所以需要在下次 DOM 更新循环结束之后执行验证函数
      this.$nextTick(() => {
        this.validate();
      });
      
    },
    validate() {
      if(!this.rules) return;
      var descriptor = {
        name: this.rules
      };
      var validator = new schema(descriptor);
      console.log('val', this.objVal, 'rule', descriptor);
      validator.validate({name: this.objVal}, (err, fields) => {
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
      selectVisible: false,
      validateState: '',
      validateMessage: ''
      // options: this.options
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
.jf-select {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    color: #495060;
    font-size: 14px;
    line-height: normal;
    position: relative;
    & ul {
        padding-left: 0!important;
        list-style-type: none;
    }
    & li {
        margin-bottom: 0;
    }
}
.jf-select-selection {
    display: block;
    height: 32px;
    box-sizing: border-box;
    outline: 0;
    user-select: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dddee1;
    transition: all .2s ease-in-out;
    & .jf-select-placeholder {
      color: #bbbec4;
    }
}
.jf-select-dropdown {
    width: 100%;
    transform-origin: center top 0px;
    will-change: top, left;
    top: 32px;
    left: 0px;
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
.jf-select-selected-value, .jf-select-placeholder {
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
.jf-select-arrow {
    position: absolute;
    top: 50%;
    right: 8px;
    line-height: 1;
    transition: all .2s ease-in-out;
    border: .45em solid transparent;
    border-top-color: #80848f;
}
.jf-select-arrow-up {
  transform: rotate(180deg);
  margin-top: -0.675em;
}
.jf-select-arrow-down {
  margin-top: -0.225em;
}
.jf-select-dropdown-list {
    min-width: 100%;
    list-style: none;
}
.jf-select-item {
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
    &:hover {
      background: #f3f3f3;
    }
}
.jf-select-item-selected, .jf-select-item-selected:hover {
    color: #fff;
    background: rgba(45,140,240,.9);
}

</style>
