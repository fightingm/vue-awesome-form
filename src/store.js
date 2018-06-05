
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      formValue: {}
    },
    mutations: {
        initFormData(state, payload) {
            state.formValue = payload.value;
        },
        setFormData(state, payload) {
            const { key, value } = payload;
            key.reduce((pre, cur, curIndex, arr) => {
                // 如果是最后一项，就是我们要改变的字段
                if(curIndex === arr.length - 1) {
                    // Vue 不能检测直接用索引设置数组某一项的值
                    if(typeof(cur) === 'number') {
                        return pre.splice(cur, 1, value);
                    } else {
                        return pre[cur] = value;
                    }
                }
                return pre[cur] = pre[cur] || {}
            }, state.formValue);
        }
    }
  })