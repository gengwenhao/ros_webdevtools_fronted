<template>
  <div id="solution-list">

    <!-- 解决方案表格容器 -->
    <div class="con">
      <div
        v-if="tableData && tableData.length > 0"
        :style="{padding: '23px', width: 'calc(100vw - 100px)', height: 'calc(100vh - 100px)', margin: 'auto'}">
        <el-button
          icon="el-icon-plus"
          type="primary"
          :style="{marginBottom: '12px'}"
          @click="$refs['solution-adder'].isShow = true"
        >创建新的解决方案
        </el-button>
        <el-table
          border
          height="90%"
          size="small"
          :data="tableData"
        >
          <el-table-column prop="title" label="名称" align="center"/>
          <el-table-column fixed="right" label="操作" align="center">
            <template slot-scope="$scope">
              <el-button type="info" size="small" plain icon="el-icon-warning-outline"
                         @click="$router.push({name: 'devPanel', query: {solutionID: $scope.row.id}})">进入
              </el-button>
              <el-button type="danger" size="small" plain icon="el-icon-delete"
                         @click="handleSolutionDelete($scope.row)">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          layout="total, prev, pager, next, jumper"
          style="margin-top: 12px;"
          :current-page="controlsForm.pageIndex"
          :total="total"
          :page-size="controlsForm.pageSize"/>
      </div>

      <!-- 没有解决方案动画展示 -->
      <div class="tips" v-else @click="$refs['solution-adder'].isShow = true">
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
    <solution-adder
      ref="solution-adder"
      @success="handleAdderSuccess"
      @error="$message.error"
    />

    <opening-animation
      v-if="!hasShowAnimation"
      :hasShow.sync="hasShowAnimation"
      />
  </div>
</template>

<script>
import api from '@/api'
import config from '@/config'
import commonElTable from '@/mixins/common-el-table'
import SolutionAdder from '@/components/solution/SolutionAdder'
import OpeningAnimation from '@/components/common/OpeningAnimation'

export default {
  name: "SolutionList",

  components: {OpeningAnimation, SolutionAdder},

  mixins: [commonElTable],

  data() {
    return {
      hasShowAnimation: false,
      isShowSolutionAdder: false,
      controlsForm: {
        pageIndex: 1,
        pageSize: config.solutionList.DEFAULT_SOLUTION_LIST_PAGE_SIZE,
        pageStart: 1
      },
      newSolutionName: '',
    }
  },

  methods: {
    fetchTableData() {
      api.solution
         .list(this.form)
         .then(res => {
           this.isLoading = false
           this.tableData = res.data.results
           this.count = res.data.count
         })
         .catch(err => {
           this.isLoading = false
         })
    },

    handleSolutionDelete({id}) {
      this.$confirm('是否永久删除该解决方案？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.solution.remove({}, id)
           .then(res => {
             this.$message.success('删除成功')
             this.fetchTableData()
           })
      })
    },

    handleAdderSuccess() {
      this.$message.success('添加完成')
      this.fetchTableData()
    }
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
