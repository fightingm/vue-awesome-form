// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import SchemaForm from '../dist/main.js'
import SchemaForm from '../src/main.js';
// import '../dist/main.css';

// Vue.config.productionTip = false
Vue.component('schema-form', SchemaForm)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
