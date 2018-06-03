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

export default {
  name: 'HelloWorld',
  store,
  components: {
    TheTree,
    Button
  },
  computed: {
    schemaForm: function () {
      const { schema } = this.formData;
      for(let key in schema) {
        const data = schema[key];
      }
    }
  },
  created: function() {
    store.commit('initFormData', {
      value: this.formData.value
    })
  },
  methods: {
    handleSubmit: function() {
      console.log(store.state.formValue);
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
    }
  },
  data () {
    return {
      "formData": {
        "schema": {
          "person": {
                "type": "TheTitle",
                "title": "个人信息",
                "properties": {
                    "name": {
                        "type": "TheInput",
                        "title": "姓名"
                    },
                    "age": {
                        "type": "TheInput",
                        "title": "年龄"
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
                      ]
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
                      ]
                    },
                    "location": {
                      "type": "TheTitle",
                      "title": "地址信息",
                      "propertyOrder": 3,
                      "properties": {
                        "province": {
                          "type": "TheInput",
                          "title": "省份"
                        },
                        "city": {
                          "type": "TheInput",
                          "title": "市"
                        }
                      }
                    },
                    "education": {
                      "type": "TheAddInput",
                      "title": "教育信息",
                      "addText": "添加"
                    },
                    "introduce": {
                        "type": "TheTextArea",
                        "title": "个人介绍"
                    },
                    "pets": {
                      "type": "TheTable",
                      "title": "宠物信息",
                      "columns": {
                        "name": {
                          "type": "TheInput",
                          "title": "名字"
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
                      }
                    }
                }
            }
        },
        "value": {
            "person": {
                "name": "Jeremy Dorn",
                "age": 25,
                "gender": 1,
                "interests": [2],
                "location": {
                  "province": "北京省",
                  "city": "北京市"
                },
                "education": [],
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
