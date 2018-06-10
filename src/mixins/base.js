
import { EventBus } from '../utils';

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
                EventBus.$emit('on-set-form-data', {
                    key: this.keyName,
                    value
                });
            }
        }
    },
    mounted() {
        EventBus.$emit('on-form-item-add', this);
    },
    beforeDestroy () {
        EventBus.$emit('on-form-item-remove', this);
    }
}