
import EventBus from '../eventBus';

export default {
    mounted() {
        EventBus.$emit('on-form-item-add', this);
    },
    beforeDestroy () {
        EventBus.$emit('on-form-item-remove', this);
    }
}