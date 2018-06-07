<template>
    <button
        type="button"
        :class="classes"
        @click="handleClick">
        <span v-if="showSlot" ref="slot"><slot></slot></span>
    </button>
</template>
<script>
    const prefixCls = 'jf-btn'
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

<style lang="postcss" scoped>
    @import "../styles/button.css";
</style>
