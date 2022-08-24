<!-- 弹出层：自定义函数列表 -->
<template>
  <div class="defined-block-lister">
    <el-dialog
      center
      title="自定义函数"
      width="700px"
      :visible.sync="isShow"
    >

      <el-button
        icon="el-icon-plus"
        style="margin-bottom: 23px"
        type="primary"
        @click="$refs['defined-block-adder'].isShow = true"
      >添加自定义函数
      </el-button>

      <el-table
        style="width: 100%; max-height: 400px; overflow-y: auto"
        :data="tableData"
      >
        <el-table-column prop="name" align="center" label="函数名称">
          <template v-slot="scope">
            <el-tag>{{ scope.row.name }}</el-tag>
          </template>
        </el-table-column>
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
        :total="count"
        @current-change="handleCurrentChange"
      />

    </el-dialog>

    <!-- 弹出层：添加自定义函数 -->
    <defined-block-adder
      ref="defined-block-adder"
      @success="handleAdderSuccess"
    />

    <!-- 弹出层：编辑自定义函数 -->
    <defined-block-editor
      ref="defined-block-editor"
      :block-data="currentEditData"
      @success="handleEditorSuccess"
    />

  </div>
</template>

<script>
import api from '@/api'
import commonElTable from '@/mixins/common-el-table'
import DefinedBlockAdder from '@/components/defined-block/DefinedBlockAdder'
import DefinedBlockEditor from '@/components/defined-block/DefinedBlockEditor'

export default {
  name: "DefinedBlockLister",
  components: {DefinedBlockEditor, DefinedBlockAdder},
  mixins: [commonElTable],

  data() {
    return {
      isShow: false,
      currentEditData: null,
      controlsForm: {
        page: 1,
        page_size: 5
      },
    }
  },

  methods: {
    fetchTableData() {
      api.definedBlock
         .list({solutionID: this.$route.query.solutionID, ...this.controlsForm})
         .then(res => {
           this.count = res.data.count
           this.tableData = res.data.results
         })
         .catch(err => {
           this.$message.error('加载失败')
         })
    },

    handleEdit(data) {
      this.currentEditData = data
      this.$refs['defined-block-editor'].isShow = true
    },

    handleDelete({id}) {
      this.$confirm('是否永久删除该函数？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.definedBlock
           .remove({}, id)
           .then(() => {
             this.$message.success('函数删除成功')
             this.fetchTableData()
             this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
           })
      })
    },

    handleAdderSuccess(data) {
      this.$message.success('自定义函数添加完成！')
      this.fetchTableData()
      this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
    },

    handleEditorSuccess(data) {
      this.$message.success('自定义函数修改成功！')
      this.fetchTableData()
      this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
    }
  }
}
</script>

