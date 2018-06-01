<template>
    <button
        type="button"
        :class="classes"
        @click="handleClick">
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </button>
</template>
<script>
    const prefixCls = 'ivu-btn'
    export default {
        name: 'Button',
        props: ['type', 'shape', 'size', 'htmlType', 'long'],
        data () {
            return {
                showSlot: true
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-${this.type}`]: !!this.type,
                        [`${prefixCls}-long`]: this.long,
                        [`${prefixCls}-${this.shape}`]: !!this.shape,
                        [`${prefixCls}-${this.size}`]: !!this.size
                    }
                ];
            }
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
            }
        },
        mounted () {
            this.showSlot = this.$slots.default !== undefined;
        }
    };
</script>

<style scoped>

.ivu-btn, .ivu-btn:active, .ivu-btn:focus {
    outline: 0;
}
.ivu-btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    white-space: nowrap;
    line-height: 1.5;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding: 6px 15px;
    font-size: 12px;
    border-radius: 4px;
    transition: color .2s linear,background-color .2s linear,border .2s linear,box-shadow .2s linear;
    color: #495060;
    background-color: #f7f7f7;
    border-color: #dddee1;
}
.ivu-btn-primary {
    color: #fff;
    background-color: #2d8cf0;
    border-color: #2d8cf0;
}
.ivu-btn-warning {
    color: #fff;
    background-color: #f90;
    border-color: #f90;
}
</style>
