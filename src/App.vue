<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style lang="postcss">
*, :after, :before {
    box-sizing: border-box;
}
[type=checkbox], [type=radio] {
    box-sizing: border-box;
    padding: 0;
}
[type=reset], [type=submit], button, html [type=button] {
    -webkit-appearance: button;
}
article, aside, blockquote, body, button, dd, details, div, dl, dt, fieldset, figcaption, figure, footer, form, h1, h2, h3, h4, h5, h6, header, hgroup, hr, input, legend, li, menu, nav, ol, p, section, td, textarea, th, ul {
    margin: 0;
    padding: 0;
}
.transition-drop-enter-active {
    opacity: 0;
    animation-name: ivuTransitionDropIn;
    animation-play-state: running;
}
.transition-drop-leave-active {
    opacity: 1;
    animation-name: ivuTransitionDropOut;
    animation-play-state: running;
}
.transition-drop-enter-active, .transition-drop-leave-active {
    animation-timing-function: ease-in-out;
    animation-duration: .3s;
    animation-fill-mode: both;
}
@keyframes ivuTransitionDropIn {
    0% {
        opacity: 0;
        transform: scaleY(0.8);
    }
    100% {
        opacity: 1;
        transform: scaleY(1);
    }
}

@keyframes ivuTransitionDropOut {
    0% {
        opacity: 1;
        transform: scaleY(1);
    }
    100% {
        opacity: 0;
        transform: scaleY(0.8);
    }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.jf-form-item {
  margin-bottom: 24px;
}

.jf-form-item-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 12px;
    color: #495060;
    line-height: 1;
    padding: 10px 12px 10px 0;
    box-sizing: border-box;
} 

.jf-form-item-content {
    position: relative;
    line-height: 32px;
    font-size: 12px;
}
.jf-form-item-noLabel {
    & > .jf-form-item-label {
        width: auto;
    }
    & > .jf-form-item-content {
        margin-left: 0px;
    }
}
.jf-form-item-hasLabel {
    & > .jf-form-item-label {
        width: 80px;
    }
    & > .jf-form-item-content {
        margin-left: 80px;
    }
}
.jf-input-wrapper {
    display: flex;
    width: 100%;
    position: relative;
    vertical-align: middle;
    line-height: normal;
}
.jf-input {
    display: inline-block;
    width: 100%;
    height: 32px;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 12px;
    border: 1px solid #dddee1;
    border-radius: 4px;
    color: #495060;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
    &:focus {
      outline: 0;
        box-shadow: 0 0 0 2px rgba(45,140,240,.2);  
    }
    &:hover {
        border-color: #57a3f3;
    }
}
.jf-form-item-error-tip {
      position: absolute;
      top: 100%;
      left: 0;
      line-height: 1;
      padding-top: 6px;
      color: #ed3f14;
}
.jf-table {
    & .jf-form-item-error-tip {
      position: static;
      text-align: left;
    }
}

</style>
