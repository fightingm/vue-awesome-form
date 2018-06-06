import schema from 'async-validator';
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
                this.dispatch(this.parentName, 'on-input-validate', {
                    keyArr: this.keyArr,
                    validateObj: {
                        validateState: '',
                        validateMessage: ''
                    }
                });
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
            if(!this.rules) return;
            var descriptor = {
              name: this.rules
            };
            var validator = new schema(descriptor);
            validator.validate({name: this.msg}, (err, fields) => {
              let state = !err ? 'success' : 'error';
              let msg = err ? err[0].message : '';
              if(this.validateObj !== undefined) {
                this.dispatch(this.parentName, 'on-input-validate', {
                  keyArr: this.keyArr,
                  validateObj: {
                    validateState: state,
                    validateMessage: msg
                  }
                });
              }else {
                this.validateState = state;
                this.validateMessage = msg;
              }
            })
        }
    }
}