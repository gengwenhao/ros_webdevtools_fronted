<template>
  <div id="solution-list" v-loading="isLoading">
    <!-- 解决方案表格容器 -->
    <div class="con" v-show="!isLoading">
      <div v-if="solutionList && solutionList.length > 0"
           :style="{padding: '23px', width: 'calc(100vw - 100px)', height: 'calc(100vh - 100px)', margin: 'auto'}">
        <el-button type="primary" :style="{marginBottom: '12px'}" @click="isShowSolutionAdderPanel = true">创建新的解决方案
        </el-button>
        <el-table size="small" border :data="solutionList" height="90%">
          <el-table-column prop="title" label="名称" align="center"/>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="$scope">
              <el-button type="info" size="small"
                         @click="$router.push({name: 'devPanel', query: {solutionID: $scope.row.id}})">查看
              </el-button>
              <el-button type="danger" size="small" @click="handleDeleteSolution($scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination layout="total, prev, pager, next, jumper"
                       style="margin-top: 12px;"
                       :current-page="form.page"
                       :total="form.count"
                       :page-size="15"
                       @current-change="handlePageChange"/>
      </div>
      <div class="tips" v-else @click="isShowSolutionAdderPanel = true">
        <h1>No solution is available</h1>
        <svg t="1647952913452" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="5602" width="200" height="200">
          <path d="M800 688v128h-128v64h128v128h64v-128h128v-64h-128v-128z" fill="#d4237a" p-id="5603"></path>
          <path
              d="M589.248 0L928 338.752V512h-64V384H544V64H96v896h448v64H32V0h557.248zM608 109.248V320h210.752L608 109.248z"
              fill="#d4237a" fill-opacity=".65" p-id="5604"></path>
        </svg>
      </div>
    </div>

    <!-- 创建解决方案面板 -->
    <el-dialog center title="创建新的解决方案" :visible.sync="isShowSolutionAdderPanel">
      <el-input size="mini" clearable placeholder="请输入解决方案名称" min="1" max="32" style="margin-bottom: 4px"
                v-model="newSolutionName"
                @keypress.enter.native="handleConfirmSolutionCodeAdder"/>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="handleCancelSolutionAdder">取 消</el-button>
        <el-button size="mini" type="primary" @click="handleConfirmSolutionCodeAdder">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import lib from '@/lib'
import settings from '@/settings'

export default {
  name: "SolutionList",
  data() {
    return {
      // flag
      isLoading: false,
      isShowSolutionAdderPanel: false,
      // res
      solutionList: [],
      // form
      form: {
        page: 1,
        pageSize: settings.DEFAULT_SOLUTION_LIST_PAGE_SIZE,
        count: 0
      },
      newSolutionName: ''
    }
  },
  methods: {
    printInfo(data) {
      console.log(data)
    },
    loadSolutions() {
      this.isLoading = true
      api.loadSolutions(this.form)
         .then(res => {
           this.isLoading = false
           this.solutionList = res.data.results
           this.form.count = res.data.count
         })
         .catch(err => {
           this.isLoading = false
         })
    },

    // event
    handlePageChange(page) {
      this.form.page = page
      this.loadSolutions()
    },
    handleDeleteSolution(id) {
      this.$confirm('是否永久删除该解决方案？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteSolution({}, id)
           .then(res => {
             this.$message.success('删除成功')
             this.loadSolutions()
           })
      })
    },
    handleCancelSolutionAdder() {
      this.newSolutionName = ''
      this.isShowSolutionAdderPanel = false
    },
    handleConfirmSolutionCodeAdder() {
      if (lib.isEmptyStr(this.newSolutionName)) {
        return -1
      }

      api.saveSolution({title: this.newSolutionName}).then(res => {
        this.$message.success('添加成功')
        this.newSolutionName = ''
        this.isShowSolutionAdderPanel = false
        this.loadSolutions()
      })
    }
  },
  created() {
    this.loadSolutions()
  }
}
</script>

<style scoped lang="scss">
#solution-list {
  color: #333;
  min-height: calc(100vh - 50px);
  display: flex;

  .con {
    margin: auto;
    display: flex;

    .tips {
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 32px;
      transition: all .8s;

      &:hover {
        transform: translateX(12px);
        opacity: .8;
      }

      h1 {
        font-size: 32px;
        font-weight: bold;
        margin: 23px auto;
      }
    }
  }


}
</style>