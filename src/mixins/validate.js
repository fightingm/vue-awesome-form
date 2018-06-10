import schema from 'async-validator';
import { EventBus } from '../utils';

export default {
    computed: {
        showValidate() {
            if(this.validateObj !== undefined) {
              return this.validateObj.validateState === 'error'
            } else {
              return this.validateState === 'error'
            }
        },
        validateInfo() {
            if(this.validateObj !== undefined) {
                return this.validateObj.validateMessage
            } else {
                return this.validateMessage
            }
        }
    },
    methods: {
        resetField() {
            if(this.validateObj !== undefined) {
                // 按理说无法修改props的值，但是这里可以修改，控制台也没有警告
                // this.validateObj.validateState = '';
                // this.validateObj.validateMessage = '';
                EventBus.$emit('on-input-validate', {
                    parentName: this.parentName,
                    keyArr: this.keyArr,
                    validateObj: {
                        validateState: '',
                        validateMessage: ''
                    }
                })
            }else {
                this.validateState = '';
                this.validateMessage = '';
            }
        },
        asyncValidate() {
            this.$nextTick(() => {
                this.validate();
            });
        },
        validate() {
            return new Promise((resolve, reject) => {
                if(!this.rules) resolve({title: this.title, status: true});
                // 对于addinput包含本身的rule和child的rule
                let descriptor = {
                    name: this.rules.myRule || this.rules
                };
                let validator = new schema(descriptor);
                validator.validate({name: this.msg}, (err, fields) => {
                    let state = !err ? 'success' : 'error';
                    let msg = err ? err[0].message : '';
                    if(this.validateObj !== undefined) {
                        EventBus.$emit('on-input-validate', {
                            parentName: this.parentName,
                            keyArr: this.keyArr,
                            validateObj: {
                                validateState: state,
                                validateMessage: msg
                            }
                        })
                    }else {
                        this.validateState = state;
                        this.validateMessage = msg;
                    }
                    if(err) {
                        resolve({
                            title: this.title,
                            status: false
                        });
                    }else {
                        resolve({
                            title: this.title,
                            status: true
                        });
                    }
                })
            })
        }
    }
}