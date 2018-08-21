
export default {
    computed: {
        msg: {
            get: function() {
                return this.objVal;
            },
            set: function(value) {
                // if(this.theFormat && this.theFormat === 'number') {
                //     value = Number(value);
                // }
                this.$props.EVENT_BUS.$emit('on-set-form-data', {
                    key: this.keyName,
                    value
                });
            }
        }
    },
    mounted() {
        this.$props.EVENT_BUS.$emit('on-form-item-add', this);
    },
    beforeDestroy () {
        this.$props.EVENT_BUS.$emit('on-form-item-remove', this);
    }
}