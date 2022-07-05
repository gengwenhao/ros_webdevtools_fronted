<!--  弹出层：代码模板列表  -->
<template>
  <div class="code-template-dialog">
    <el-dialog
      center
      title="代码生成模板列表"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-button
        icon="el-icon-plus"
        style="margin-bottom: 23px"
        type="primary"
      >添加新的模板
      </el-button>

      <el-table
        style="width: 100%;max-height: 400px;overflow-y: auto"
        :data="tableData"
      >
        <el-table-column prop="name" align="center" label="模板名称"/>
        <el-table-column prop="add_time" align="center" label="添加时间"/>
        <el-table-column prop="update_time" align="center" label="更新时间"/>
        <el-table-column label="操作" align="center" width="200px">
          <template v-slot="scope">
            <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        layout="total, prev, pager, next, jumper"
        style="margin-top: 12px;"
        :current-page="controlsForm.page"
        :page-size="controlsForm.page_size"
        :total="total"
        @current-change="handleCurrentChange"
      />

    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import commonElTable from '@/mixins/common-el-table'

export default {
  name: "CodeTemplateDialog",

  mixins: [commonElTable],

  data() {
    return {
      isShow: false
    }
  },

  methods: {
    fetchTableData() {
      api.codeTemplate
         .list({solutionID: this.$route.query.solutionID, ...this.controlsForm})
         .then(res => {
           this.total = res.data.count
           this.tableData = res.data.results
         })
         .catch(err => {
           this.$message.error('加载失败')
         })
    },

    handleEdit(data) {

    },

    handleDelete({id}) {
      this.$confirm('是否永久删除该模板？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.codeTemplate
           .remove({}, id)
           .then(() => {
             this.$message.success('删除成功')
             // this.$store.commit('updateGlobalData')
             this.fetchTableData()
           })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.code-template-dialog {

}
</style>
