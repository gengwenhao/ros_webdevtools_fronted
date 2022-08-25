// 表格需要的相关逻辑
const commonElTableMixin = {
  data() {
    return {
      // 数据量
      count: 0,
      // 表格绑定的数据
      tableData: [],
      // 表格选中
      tableSelectionItems: [],
      // form
      controlsForm: {
        // 当前页码
        page: 1,
        // 分页大小
        page_size: 10
      }
    }
  },

  methods: {
    // xhr
    fetchTableData() {

    },

    // table handler
    // 表格分页变化
    handleSizeChange(size) {
      this.controlsForm.page_size = Number(size)
      this.fetchTableData()
    },

    // 表格页码变化
    handleCurrentChange(page) {
      this.controlsForm.page = Number(page)
      this.fetchTableData()
    },

    // 表格选中项变化
    handleSelectionChange(val) {
      this.tableSelectionItems = val
    },

    handleOpen() {
      this.fetchTableData()
    },

    handleClose() {
    }
  },

  created() {
    this.fetchTableData()
  },

  activated() {
    this.fetchTableData()
  }
}

export default commonElTableMixin
