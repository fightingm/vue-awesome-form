<template>
  <div id="app">
    <img src="../src/assets/logo.png">
    <schema-form
      ref="schemaForm"
      :schema="formData.schema"
      :value="formData.value"
    ></schema-form>
    <div style="text-align: center; margin-top: 10px;">
      <button @click="handleReset" type="button" class="jf-btn jf-btn-warning">
        <span>重置</span>
      </button>
      <button @click="handleSubmit" type="button" class="jf-btn jf-btn-primary">
        <span>提交</span>
      </button>
    </div>
  </div>
</template>

<script>
// import SchemaForm from '../dist/vue-json-form.js'
// import SchemaForm from '../src/main.js'


export default {
  name: 'App',
  methods: {
    handleSubmit() {
      this.$refs.schemaForm.validate((err, values) => {
        if(err) {
          console.log('验证失败');
        } else {
          console.log('验证成功', values);
        }
      })
    },
    handleReset() {
      this.$refs.schemaForm.resetFields();
    }
  },
  data () {
    return {
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
                          "message": "The name cannot be empty"
                        }
                    },
                    "age": {
                        "type": "TheInput",
                        "title": "年龄",
                        "rules": [
                          {
                            "required": true,
                            "message": "The age cannot be empty"
                          }
                        ]
                    },
                    "gender": {
                      "type": "TheRadio",
                      "title": "性别",
                      "propertyOrder": 10,
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
                        "message": "The 性别 cannot be empty"
                      }
                    },
                    "interests": {
                      "type": "TheCheckbox",
                      "title": "兴趣爱好",
                      "propertyOrder": 1,
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
                        "message": "The 兴趣爱好 cannot be empty"
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
                            "message": "The 省份 cannot be empty"
                          }
                        },
                        "city": {
                          "type": "TheInput",
                          "title": "市",
                          "rules": {
                            "required": true,
                            "message": "The 市 cannot be empty"
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
                        "message": "工作不能为空"
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
                            "message": "The 教育信息 cannot be empty"
                          },
                          "childRule": {
                            "required": true,
                            "message": "这一项不能为空"
                          }
                      }
                    },
                    "introduce": {
                        "type": "TheTextArea",
                        "title": "个人介绍",
                        "rules": {
                          "required": true,
                          "message": "The 个人介绍 cannot be empty"
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
                            "message": "名字不能为空"
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
                            "message": "类型不能为空"
                          }
                        },
                        "gender": {
                          "type": "TheRadio",
                          "title": "性别",
                          "propertyOrder": 3,
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
                            "message": "The 性别 cannot be empty"
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
                            "message": "The 兴趣爱好 cannot be empty"
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
                        "message": "The 宠物信息 cannot be empty"
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
                      "message": "The name cannot be empty"
                    }
                },
                "passward": {
                    "type": "ThePassInput",
                    "title": "密码",
                    "rules": {
                      "required": true,
                      "message": "The 密码 cannot be empty"
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

<style lang="postcss">
</style>
