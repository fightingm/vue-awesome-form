<template>
  <div>
    <the-tree
      v-for="(val, key, index) in formData.schema"
      :key="index"
      :objKey="key"
      :objVal="formData.value[key]"
      :model="val"></the-tree>
    <button @click="handleSubmit">提交</button>
  </div>
</template>

<script>
import { store } from '../store'
import TheTree from './TheTree';

export default {
  name: 'HelloWorld',
  components: {
    TheTree
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
    }
  },
  data () {
    return {
      "formData": {
        "schema": {
          "psbConfig": {
                "type": "TheTitle",
                "title": "万维 psb配置",
                "properties": {
                    "psb-wanwei-user-password": {
                        "type": "TheInput",
                        "title": "psb万维用户密码"
                    },
                    "psb-wanwei-hotelId": {
                        "type": "TheTitle",
                        "title": "psb-万维房间ID",
                        "properties": {
                          "test": {
                            "type": "TheInput",
                            "title": "测试"
                          }
                        }
                    },
                    "calcType": {
                      "type": "TheSelect",
                      "title": "房费计算方式",
                      "options": [
                        {
                          "value": 1,
                          "label": "按首日房费比例计算"
                        },
                        {
                          "value": 2,
                          "label": "固定金额"
                        }
                      ]
                    },
                    "searchByOrderNoImplemented": {
                      "type": "TheRadio",
                      "title": "是否实现订单号查询接口",
                      "options": [
                        {
                          "value": 1,
                          "label": "苹果"
                        },
                        {
                          "value": 2,
                          "label": "安卓"
                        },
                        {
                          "value": 3,
                          "label": "windowsPhone"
                        }
                      ]
                    },
                    "interests": {
                      "type": "TheCheckbox",
                      "title": "兴趣爱好",
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
                    "checkInTicketNote": {
                      "type": "TheAddInput",
                      "title": "入住成功后打印小票后追加的须知",
                      "addText": "添加"
                    },
                    "psb-wanwei-jdbc-url": {
                        "type": "TheTextArea",
                        "title": "psb-万维JDBC地址"
                    },
                    "psb-wanwei-user-name": {
                        "type": "TheInput",
                        "title": "psb-万维用户名"
                    },
                    "timeSegments": {
                      "type": "TheTable",
                      "title": "分段加收房费",
                      "columns": {
                        "amount": {
                          "type": "TheInput",
                          "title": "固定金额"
                        },
                        "fromHour": {
                          "type": "TheInput",
                          "title": "从(含)"
                        },
                        "calcType": {
                          "type": "TheSelect",
                          "title": "房费计算方式",
                          "options": [
                            {
                              "value": 1,
                              "label": "按首日房费比例计算"
                            },
                            {
                              "value": 2,
                              "label": "固定金额"
                            }
                          ]
                        },
                        "percent": {
                          "type": "TheInput",
                          "title": "百分比"
                        },
                        "toHour": {
                          "type": "TheInput",
                          "title": "至(不含)"
                        }
                      },
                      "addDefault": {
                        "amount": "固定金额1",
                        "calcType": 2,
                        "fromHour": "从(含)1",
                        "toHour": "至(不含)1",
                        "percent": "百分比1"
                      }
                    }
                }
            }
        },
        "value": {
            "psbConfig": {
                "psb-wanwei-user-password": "11",
                "psb-wanwei-hotelId": {
                  "test": "22"
                },
                "psb-wanwei-jdbc-url": "33",
                "psb-wanwei-user-name": "44",
                "calcType": 2,
                "searchByOrderNoImplemented": 3,
                "interests": [2],
                "checkInTicketNote": ["das", "???"],
                "timeSegments": [{
                  "amount": "固定金额",
                  "calcType": 1,
                  "fromHour": "从(含)",
                  "toHour": "至(不含)",
                  "percent": "百分比"
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
</style>
