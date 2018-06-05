<template>
  <form class="jf-form">
    <the-tree
      v-for="(val, key, index) in orderProperty(formData.schema)"
      :key="index"
      :objKey="key"
      :objVal="formData.value[key]"
      :model="val"></the-tree>
    <Button @click="handleSubmit" type="primary">提交</Button>
  </form>
</template>

<script>
import { store } from '../store'
import TheTree from './TheTree';
import Button from './button'

import schema from 'async-validator';
// 表单验证这里参考iview的做法，通过mixin的方式将事件emitter注入到每个组件
// 通过事件的广播与派发，input组件blur之后向上dispatch事件，
// 然后在根组件统一负责表单的验证
export default {
  name: 'HelloWorld',
  store,
  components: {
    TheTree,
    Button
  },
  created() {
    store.commit('initFormData', {
      value: this.formData.value
    });
    this.$on('on-form-item-add', field => {
      if(field) this.fields.push(field);
      return false;
    })
  },
  methods: {
    validate() {
      // var descriptor = this.formData.ruleValidate;
      // var validator = new schema(descriptor);
      // var value = store.state.formValue;
      // console.log('???', value);
      // validator.validate(value, (err, fields) => {
      //   if(err) {
      //     console.log(err);
      //     return;
      //   }
      //   console.log('success');
      // })
      this.fields.forEach(field => {
        field.validate();
      })
    },
    handleSubmit: function() {
      this.validate();
      // console.log(this.fields);
      // console.log(store.state.formValue);
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
      "fields": [],
      "formData": {
        "ruleValidate": {
          "person": {
            "name": {
              "required": true,
              "message": "The name cannot be empty",
              "trigger": "blur"
            },
            "age": [
              {
                "required": true,
                "message": "The age cannot be empty",
                "trigger": "blur"
              },
              {
                "type": "number",
                "message": "年龄必须是数字",
                "tigger": "blur"
              }
            ]
          }
        },
        "schema": {
          "person": {
                "type": "TheTitle",
                "title": "个人信息",
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
                      "type": "TheTitle",
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
                      ]
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
                          ]
                        }
                      },
                      "addDefault": {
                        "type": 2,
                        "name": "Walter"
                      },
                      "rules": {
                        "type": "array",
                        "required": true,
                        "message": "The 宠物信息 cannot be empty",
                        "trigger": "blur"
                      }
                    }
                }
            }
        },
        "value": {
            "person": {
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
                "job": "other",
                "pets": [{
                  "type": 1,
                  "name": "Walter"
                }]
            }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.jf-form {
  text-align: left;
}
</style>
