<!--  弹出层：代码模板列表  -->
<template>
  <div class="code-template-lister">
    <el-dialog
      center
      title="该解决方案的代码模板"
      :visible.sync="isShow"
      @open="handleOpen"
    >

      <el-button
        icon="el-icon-plus"
        style="margin-bottom: 23px"
        type="primary"
        @click="$refs['code-template-adder'].isShow = true"
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

    <!-- 弹出层：添加模板 -->
    <code-template-adder
      ref="code-template-adder"
      @success="handleAdderSuccess"/>

    <!-- 弹出层：编辑模板 -->
    <code-template-editor
      ref="code-template-editor"
      :template-data="currentEditData"
      @success="handleEditorSuccess"/>

  </div>
</template>

<script>
import api from '@/api'
import commonElTable from '@/mixins/common-el-table'
import CodeTemplateAdder from '@/components/code-template/CodeTemplateAdder'
import CodeTemplateEditor from '@/components/code-template/CodeTemplateEditor'

export default {
  name: "CodeTemplateLister",
  components: {CodeTemplateEditor, CodeTemplateAdder},
  mixins: [commonElTable],

  data() {
    return {
      isShow: false,
      currentEditData: null,
      controlsForm: {
        page: 1,
        page_size: 5
      }
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
      this.currentEditData = data
      this.$refs['code-template-editor'].isShow = true
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
             this.$message.success('模板删除成功')
             this.fetchTableData()
             this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
           })
      })
    },

    handleAdderSuccess(data) {
      this.$message.success('模板添加完成！')
      this.fetchTableData()
      this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
    },

    handleEditorSuccess(data) {
      this.$message.success('模板修改成功！')
      this.fetchTableData()
      this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
    }
  }
}
</script>
