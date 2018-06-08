# vue-awesome-form

> 类似json-editor的vue表单组件

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
import 'vue-awesome-form/dist/main.css'

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

CDN使用
```html
<script src="https://unpkg.com/vue-awesome-form@latest/dist/main.js"></script>
<script src="https://unpkg.com/vue-awesome-form@latest/dist/main.css"></script>
```

demo地址： <https://jsrun.net/bKgKp/embedded/all/light/>

上面的demo包含了组件的所有功能及支持的表单项。
