<!-- 弹出层：机器人列表 -->
<template>
  <div class="remote-machine-lister">
    <el-dialog
      center
      title="机器人连接配置列表"
      :visible.sync="isShow"
      width="70%"
    >

      <el-button
        icon="el-icon-plus"
        style="margin-bottom: 23px"
        type="primary"
        @click="$refs['remote-machine-adder'].isShow = true"
      >添加新机器人连接配置
      </el-button>

      <el-table
        style="width: 100%; max-height: 400px; overflow-y: auto"
        :data="tableData"
      >
        <el-table-column prop="name" align="center" label="机器人名称"/>
        <el-table-column prop="ip" align="center" label="IP"/>
        <el-table-column prop="port" align="center" label="端口"/>
        <el-table-column prop="add_time" align="center" label="添加时间"/>
        <el-table-column prop="update_time" align="center" label="更新时间"/>
        <el-table-column label="操作" align="center" width="280px">
          <template v-slot="scope">
            <el-button type="primary" @click="handleOpenTerm(scope.row)">WebSSH</el-button>
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

    <!-- 弹出层：添加机器人连接配置 -->
    <remote-machine-adder
      ref="remote-machine-adder"
      @success="handleAdderSuccess"
    />

    <!-- 弹出层：编辑机器人连接配置 -->
    <remote-machine-editor
      ref="remote-machine-editor"
      :remote-machine-data="currentEditData"
      @success="handleEditorSuccess"
    />

  </div>
</template>

<script>
import api from '@/api'
import commonElTable from '@/mixins/common-el-table'
import RemoteMachineAdder from '@/components/remote-machine/RemoteMachineAdder'
import RemoteMachineEditor from '@/components/remote-machine/RemoteMachineEditor'

export default {
  name: "RemoteMachineLister",
  components: {RemoteMachineEditor, RemoteMachineAdder},
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
      api.remoteMachine
         .list({solutionID: this.$route.query.solutionID, ...this.controlsForm})
         .then(res => {
           this.total = res.data.count
           this.tableData = res.data.results
         })
         .catch(err => {
           this.$message.error('加载失败')
         })
    },

    handleOpenTerm(data) {
      window.open(`/command-panel?id=${data.id}`, '_blank')
    },

    handleEdit(data) {
      this.currentEditData = data
      this.$refs['remote-machine-editor'].isShow = true
    },

    handleDelete({id}) {
      this.$confirm('是否永久删除该连接配置？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.remoteMachine
           .remove({}, id)
           .then(() => {
             this.$message.success('该连接配置删除成功!')
             this.fetchTableData()
             this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
           })
      })
    },

    handleAdderSuccess(data) {
      this.$message.success('该配置已添加完成！')
      this.fetchTableData()
      this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
    },

    handleEditorSuccess(data) {
      this.$message.success('配置修改成功！')
      this.fetchTableData()
      this.$store.dispatch('updateGlobalInfo', {solutionID: this.$route.query.solutionID})
    }
  }
}
</script>
