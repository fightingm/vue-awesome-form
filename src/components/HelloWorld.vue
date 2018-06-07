<template>
  <form class="jf-form">
    <the-tree
      v-for="(val, key, index) in orderProperty(formData.schema)"
      :key="index"
      :objKey="[key]"
      :objVal="objVal[key]"
      v-bind="val"></the-tree>
    <div style="text-align: center; margin-top: 10px;">
      <Button @click="handleReset" type="warning">重置</Button>
      <Button @click="handleSubmit" type="primary">提交</Button>
    </div>
  </form>
</template>

<script>
import TheTree from './TheTree';
import Button from './button'
import schema from 'async-validator';
// 表单验证这里参考iview的做法，通过mixin的方式将事件emitter注入到每个组件
// 通过事件的广播与派发，input组件blur之后向上dispatch事件，
// 然后在根组件统一负责表单的验证
export default {
  name: 'HelloWorld',
  components: {
    TheTree,
    Button
  },
  computed: {
    objVal() {
      // return store.state.formValue;
      return this.formValue;
    }
  },
  created() {
    // store.commit('initFormData', {
    //   value: this.formData.value
    // });
    this.initFormData(this.formData.value);
    this.$on('on-form-item-add', field => {
      if(field) this.fields.push(field);
      return false;
    });
    this.$on('on-form-item-remove', (field) => {
      if (field) this.fields.splice(this.fields.indexOf(field), 1);
      return false;
    });
    this.$on('on-set-form-data', payload => {
      this.setFormData(payload);
    });
  },
  methods: {
    initFormData(value) {
        this.formValue = this.cloneDeep(value);
    },
    cloneDeep(source) {
      // 只适用于对象中没有函数
      return JSON.parse(JSON.stringify(source));
      // var type = Object.prototype.toString.call(source);
      // let obj;
      // if(type === '[object Array]'){
      //     obj = [];
      // } else if(type === '[object Object]'){
      //     obj = {};
      // } else {
      //     //不再具有下一层次
      //     return source;
      // }
      // if(type === '[object Array]'){
      //     for(let i = 0, len = source.length; i < len; i++){
      //         obj.push(this.cloneDeep(source[i]));
      //     }
      // } else if(type === '[object Object]'){
      //     for(let key in source){
      //         obj[key] = this.cloneDeep(source[key]);
      //     }
      // }
      // return obj;
      // var result={};
      // for (var key in source) {
      //     result[key] = typeof(source[key]) ==='object' ? this.cloneDeep(source[key]) : source[key];
      // } 
      // return result; 
    },
    setFormData(payload) {
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
        }, this.formValue);
    },
    validate(cb) {
      let noerr = true;
      let len = this.fields.length;
      this.fields.forEach((field, index) => {
        field.validate().then(res => {
          const { title, status } = res;
          if(!status) {
            noerr = false;
            console.log(title);
          }
          if((index + 1) === len) {
            cb(noerr);
          }
        }).catch(err => {
          console.log(err);
        })
      })
    },
    handleSubmit() {
      this.validate(valid => {
        if(valid) {
          console.log('验证成功', this.formValue);
        }else {
          console.log('验证失败');
        }
      });
      // console.log(this.fields);
    },
    // 三种思路，第一种方式在每个组件保存初始值，reset的时候循环调用每一个reset事件
    // 第二种思路，根组件保存一个深拷贝的初始值，然后统一reset
    // 第二种思路只能恢复初始值，没法处理组件内的状态，比如校验信息
    // 第三种思路结合两种思路，在根组件reset数据，在每个组件内部处理自己的状态
    handleReset() {
      this.initFormData(this.formData.value);
      // store.commit('initFormData', {
      //   value: this.formData.initValue
      // });
      this.fields.forEach(field => {
        field.resetField && field.resetField();
      });
    },
     // 根据propertyOrder 从小到大排序
    orderProperty(oldObj) {
      // 先遍历对象，生成数组
      // 对数组排序
      // 生成一个新的对象
      const keys = Object.keys(oldObj);
      // 如果对象只有一个字段，不需要排序
      if(keys.length <= 1) return oldObj;
      return keys.map(key => {
        return {
          key,
          val: oldObj[key]
        };
      }).sort((pre, cur) => {
        return (pre.val.propertyOrder || 999) - (cur.val.propertyOrder || 999);
      }).reduce((pre, cur) => {
        pre[cur.key] = cur.val;
        return pre;
      }, {});
    },
    onFieldBlur() {
      console.log(arguments);
    }
  },
  mounted() {
    this.$on('on-form-blur', this.onFieldBlur);
  },
  data () {
    return {
      "initFormValue": {},
      "formValue": {},
      "fields": [],
      "formData": {
        "schema": {
          "register": {
                "type": "TheTree",
                "title": "注册",
                "properties": {
                    "name": {
                        "type": "TheInput",
                        "title": "姓名",
                        "rules": {
                          "required": true,
                          "message": "The name cannot be empty",
                          "trigger": "blur"
                        }
                    },
                    "age": {
                        "type": "TheInput",
                        "title": "年龄",
                        "rules": [
                          {
                            "required": true,
                            "message": "The age cannot be empty",
                            "trigger": "blur"
                          }
                        ]
                    },
                    "gender": {
                      "type": "TheRadio",
                      "title": "性别",
                      "propertyOrder": 1,
                      "options": [
                        {
                          "value": 1,
                          "label": "男"
                        },
                        {
                          "value": 2,
                          "label": "女"
                        }
                      ],
                      "rules": {
                        "type": "number",
                        "required": true,
                        "message": "The 性别 cannot be empty",
                        "trigger": "blur"
                      }
                    },
                    "interests": {
                      "type": "TheCheckbox",
                      "title": "兴趣爱好",
                      "propertyOrder": 2,
                      "options": [
                        {
                          "value": 1,
                          "label": "吃饭"
                        },
                        {
                          "value": 2,
                          "label": "睡觉"
                        },
                        {
                          "value": 3,
                          "label": "打豆豆"
                        }
                      ],
                      "rules": {
                        "type": "array",
                        "required": true,
                        "message": "The 兴趣爱好 cannot be empty",
                        "trigger": "blur"
                      }
                    },
                    "location": {
                      "type": "TheTree",
                      "title": "地址信息",
                      "propertyOrder": 3,
                      "properties": {
                        "province": {
                          "type": "TheInput",
                          "title": "省份",
                          "rules": {
                            "required": true,
                            "message": "The 省份 cannot be empty",
                            "trigger": "blur"
                          }
                        },
                        "city": {
                          "type": "TheInput",
                          "title": "市",
                          "rules": {
                            "required": true,
                            "message": "The 市 cannot be empty",
                            "trigger": "blur"
                          }
                        }
                      }
                    },
                    "job": {
                      "type": "TheSelect",
                      "title": "工作",
                      "propertyOrder": 10,
                      "options": [
                        {
                          "value": "internet",
                          "label": "互联网"
                        },
                        {
                          "value": "medicine",
                          "label": "医学"
                        },
                        {
                          "value": "estate",
                          "label": "房地产"
                        },
                        {
                          "value": "other",
                          "label": "其他"
                        }
                      ],
                      "rules": {
                        "required": true,
                        "message": "工作不能为空",
                        "trigger": "blur"
                      }
                    },
                    "education": {
                      "type": "TheAddInput",
                      "title": "教育信息",
                      "addText": "添加",
                      "rules": {
                        "myRule": {
                            "type": "array",
                            "required": true,
                            "message": "The 教育信息 cannot be empty",
                            "trigger": "blur"
                          },
                          "childRule": {
                            "required": true,
                            "message": "这一项不能为空",
                            "trigger": "blur"
                          }
                      }
                    },
                    "introduce": {
                        "type": "TheTextArea",
                        "title": "个人介绍",
                        "rules": {
                          "required": true,
                          "message": "The 个人介绍 cannot be empty",
                          "trigger": "blur"
                        }
                    },
                    "pets": {
                      "type": "TheTable",
                      "title": "宠物信息",
                      "columns": {
                        "name": {
                          "type": "TheInput",
                          "title": "名字",
                          "rules": {
                            "required": true,
                            "message": "名字不能为空",
                            "trigger": "blur"
                          }
                        },
                        "type": {
                          "type": "TheSelect",
                          "title": "类型",
                          "propertyOrder": 1,
                          "options": [
                            {
                              "value": 1,
                              "label": "猫"
                            },
                            {
                              "value": 2,
                              "label": "狗"
                            },
                            {
                              "value": 3,
                              "label": "鸟"
                            },
                            {
                              "value": 4,
                              "label": "其他"
                            }
                          ],
                          "rules": {
                            "type": "number",
                            "required": true,
                            "message": "类型不能为空",
                            "trigger": "blur"
                          }
                        },
                        "gender": {
                          "type": "TheRadio",
                          "title": "性别",
                          "propertyOrder": 1,
                          "options": [
                            {
                              "value": 1,
                              "label": "男"
                            },
                            {
                              "value": 2,
                              "label": "女"
                            }
                          ],
                          "rules": {
                            "type": "number",
                            "required": true,
                            "message": "The 性别 cannot be empty",
                            "trigger": "blur"
                          }
                        },
                        "interests": {
                          "type": "TheCheckbox",
                          "title": "兴趣爱好",
                          "propertyOrder": 2,
                          "options": [
                            {
                              "value": 1,
                              "label": "吃饭"
                            },
                            {
                              "value": 2,
                              "label": "睡觉"
                            },
                            {
                              "value": 3,
                              "label": "打豆豆"
                            }
                          ],
                          "rules": {
                            "type": "array",
                            "required": true,
                            "message": "The 兴趣爱好 cannot be empty",
                            "trigger": "blur"
                          }
                        }
                      },
                      "addDefault": {
                        "type": "",
                        "name": "",
                        "gender": "",
                        "interests": []
                      },
                      "rules": {
                        "type": "array",
                        "required": true,
                        "message": "The 宠物信息 cannot be empty",
                        "trigger": "blur"
                      }
                    }
                }
            },
            "login": {
              "type": "TheTree",
              "title": "登录信息",
              "properties": {
                "name": {
                    "type": "TheInput",
                    "title": "姓名",
                    "rules": {
                      "required": true,
                      "message": "The name cannot be empty",
                      "trigger": "blur"
                    }
                },
                "passward": {
                    "type": "TheInput",
                    "title": "密码",
                    "rules": {
                      "required": true,
                      "message": "The 密码 cannot be empty",
                      "trigger": "blur"
                    }
                }
              }
            }
        
        
        
        },
        "value": {
            "register": {
                "name": "",
                "age": "25",
                "gender": '',
                "interests": [],
                "location": {
                  "province": "北京省",
                  "city": "北京市"
                },
                "introduce": '',
                "education": [''],
                "job": "",
                "pets": [{
                  "type": "",
                  "name": "Walter",
                  "gender": 1,
                  "interests": [1, 2]
                }]
            },
            "login": {
              "name": "",
              "passward": ""
            }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
