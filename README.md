# vue-awesome-form

> A schema-based form generator component for Vue.js.

## 安装

``` bash
# 可以通过npm或者yarn安装
npm install vue-awesome-form 
yarn add vue-awesome-form
```

## 使用

注册组件
``` js
import Vue from 'vue'
import SchemaForm from 'vue-awesome-form'
import 'vue-awesome-form/styles/vue-awesome-form.css'
Vue.component('schema-form', SchemaForm)
```

在组件中使用
```html
<schema-form
      ref="schemaForm"
      :schema="formData.schema"
      :value="formData.value"
    ></schema-form>
```



