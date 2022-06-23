// 表格需要的相关逻辑
export default {
  data() {
    return {
      // 数据量
      total: 0,
      // 表格绑定的数据
      currentBindTableData: [],
      // 表格选中
      tableSelectionItems: [],
      // form
      controlsForm: {
        // 当前页码
        pageIndex: 1,
        // 分页大小
        pageSize: 10,
        // 分页开始位置
        pageStart: 1
      }
    }
  },
  watch: {
    // 监控表格绑定的表单，如有变化直接请求接口更新数据
    controlsForm: {
      handler(val, oldVal) {
        this.fetchTableData()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // xhr
    fetchTableData() {
      const tips = `需要定义 fetchTableData()，例如：
fetchTableData() {
  api.listStocktaking(this.queryObject)
     .then(res => {
       // 更新数据总数
       this.total = res.total || 0
       // 更新表格数据
       this.currentBindTableData = res.records || []
     })
}`
      console.log(tips)
    },
    // table handler
    // 表格分页变化
    handleSizeChange(size) {
      this.controlsForm.pageSize = Number(size)
    },
    // 表格页码变化
    handleCurrentChange(page) {
      this.controlsForm.pageIndex = Number(page)
    },
    // 表格选中项变化
    handleSelectionChange(val) {
      this.tableSelectionItems = val
    }
  }
}
