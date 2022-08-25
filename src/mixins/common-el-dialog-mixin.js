import _ from 'lodash'

const commonElDialogMixin = {
  props: {
    initData: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isShow: false,
      form: {},
      rules: {}
    }
  },

  methods: {
    handleBtnCancelClick() {
      this.$emit('cancel', this.form)
      this.form = _.cloneDeep(this.$options.data().form)
      this.isShow = false
    },

    handleBtnConfirmClick() {
      this.$emit('confirm', this.form)

      this.$refs['form'].validate((isValid) => {
        if (isValid === true) {
          this.submit && this.submit(this.form)
                             .then(res => {
                               this.$emit('success', this.form)
                             })
                             .catch(err => {
                               this.$emit('error', err)
                             })
        } else {
          this.$emit('error', 'validate failed')
        }
      })

    },

    handleClose() {
      this.form = _.cloneDeep(this.$options.data().form)
    },

    handleOpen() {
      this.form = _.cloneDeep(this.$options.data().form)
    }
  }
}

export default commonElDialogMixin