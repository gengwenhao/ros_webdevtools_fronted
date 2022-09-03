<!-- 弹出层：分享解决方案 -->
<template>
  <div class="solution-sharer">
    <el-dialog
      center
      title="分享解决方案"
      width="800px"
      :visible.sync="isShow"
      @open="handleOpen"
      @close="handleClose"
    >

      <div class="dialog-con">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane v-if="!qrContent" label="链接分享" name="link">
            <div class="inner-content">

              <el-form
                label-position="left"
                label-width="80px"
                ref="form"
                :model="form"
                :rules="rules"
              >
                <el-form-item label="分享形式">
                  <el-radio-group v-model="hasCode">
                    <el-radio :label="0">无验证码</el-radio>
                    <el-radio :label="1">
                      随机验证码&nbsp;&nbsp;
                      <el-input
                        v-if="hasCode === 1"
                        disabled
                        :value="form.code"
                        style="width: 110px;"
                      />
                    </el-radio>
                    <el-radio :label="2" style="height: 28px;">
                      手动设置验证码&nbsp;&nbsp;
                      <el-form-item prop="code" style="display: inline-block">
                        <el-input
                          v-if="hasCode === 2"
                          clearable
                          :minlength="4"
                          :maxlength="9"
                          placeholder="重复使用相同验证码有泄漏风险"
                          style="width: 220px;"
                          v-model="form.code"
                        />
                      </el-form-item>
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="访问人数" prop="name">
                  <el-radio-group v-model="isLimitMemberNumber">
                    <el-radio :label="false">不限制</el-radio>
                    <el-radio :label="true">
                      限制总访问人数&nbsp;&nbsp;
                      <el-input-number
                        v-if="isLimitMemberNumber"
                        :min="1"
                        :max="1000"
                        v-model="form.max_member_number"
                      />
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有效期" prop="name">
                  <el-radio-group v-model="form.expiration_date">
                    <el-radio :label="null">永久有效</el-radio>
                    <el-radio :label="30">30天</el-radio>
                    <el-radio :label="7">7天</el-radio>
                    <el-radio :label="1">1天</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>

              <div class="dialog-footer" slot="footer">
                <el-button size="mini" @click="handleBtnCancelClick">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleBtnLinkCreateClick">创建链接</el-button>
              </div>

            </div>
          </el-tab-pane>
          <el-tab-pane v-if="qrContent" label="生成的链接" name="qrcode">
            <div v-loading="isLoading" class="inner-content">
              <div class="code-con">
                <vue-qr
                  v-if="qrContent"
                  style="margin: 0 0 24px;"
                  :size="220"
                  :text="qrContent"
                  :callback="handleVueQrSuccess"
                />
                <el-button-group>
                  <el-button
                    class="btn-iconfont"
                    icon="iconfont icon-rescan"
                    size="small"
                    type="primary"
                    @click="handleBtnQrSaveClick"
                  >保存二维码
                  </el-button>
                  <el-button
                    class="btn-iconfont"
                    icon="iconfont icon-copy-template"
                    plain
                    size="small"
                    type="primary"
                    @click="handleBtnLinkCopyClick"
                  >复制链接
                  </el-button>
                  <el-button
                    class="btn-iconfont"
                    icon="iconfont icon-fanhui"
                    size="small"
                    type="danger"
                    @click="handleOpen"
                  >重新生成
                  </el-button>
                </el-button-group>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="管理已分享链接" name="manager">
            <div class="inner-content bg-white">
              <el-table :data="tableData" width="450" height="350">
                <el-table-column prop="code" align="center" label="验证码">
                  <template v-slot="scope">
                    <el-tag v-if="scope.row.code === null" effect="dark">无验证码</el-tag>
                    <el-tooltip v-else class="item" effect="dark" content="点击复制验证码" placement="top-start">
                      <el-tag
                        effect="dark"
                        style="cursor: pointer;"
                        @click="handleCodeClick(scope.row)"
                      >{{ scope.row.code }}
                      </el-tag>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="limitMemberNumber" align="center" label="人数上限">
                  <template v-slot="scope">
                    <el-tag v-if="!scope.row.limitMemberNumber" effect="dark" type="danger">无限制</el-tag>
                    <el-tag v-else effect="dark" type="danger">{{ scope.row.maxMemberNumber }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="expiration_date" align="center" label="有效天数" width="110">
                  <template v-slot="scope">
                    <el-tag v-if="!scope.row.expiration_date">永久有效</el-tag>
                    <el-tag v-else>{{ scope.row.expiration_date }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="是否过期" width="80">
                  <template v-slot="scope">
                    <el-tag v-if="scope.row.is_expired" type="danger">已过期</el-tag>
                    <el-tag v-else>未过期</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="update_time" align="center" label="创建日期"/>
                <el-table-column label="操作" align="center" width="220">
                  <template v-slot="scope">
                    <el-button
                      type="danger"
                      @click="handleBtnUnshareClick(scope.row)"
                    >取消分享
                    </el-button>
                    <el-button
                      :disabled="scope.row.is_expired"
                      type="primary"
                      @click="handleBtnCopyClick(scope.row)"
                    >复制链接
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <el-pagination
                layout="total, prev, pager, next, jumper"
                style="margin-top: 12px;"
                :current-page="pageForm.page"
                :page-size="pageForm.page_size"
                :total="count"
                @current-change="handleCurrentChange"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import api from '@/api'
import commonElDialogMixin from '@/mixins/common-el-dialog-mixin'
import VueQr from 'vue-qr/dist/vue-qr'
import JsFileDownloader from 'js-file-downloader'
import commonElTableMixin from '@/mixins/common-el-table-mixin'
import {BASE_URL} from '@/config'
import {randomCode} from '@/lib/utils'

export default {
  name: "SolutionSharer",

  components: {VueQr},

  mixins: [commonElDialogMixin, commonElTableMixin],

  data() {
    return {
      // flag
      isLoading: false,

      // data
      activeName: 'link',
      // 二维码的内容
      qrContent: '',
      // 生成后的二维码 base 编码（用于下载保存）
      qrImageURI: null,
      // 生成的分享链接
      linkObj: null,
      // 分享形式
      hasCode: 1, // { 0: '无验证码', 1: '随机验证码', 2: '手动设置验证码' }
      // 是否限制总访问人数
      isLimitMemberNumber: true,

      // form
      form: {
        // 验证码
        code: null,
        // 最大总访问人数
        max_member_number: 20,
        // 过期天数（null 表示 '不过期' number 表示'过期天数'）
        expiration_date: 30
      },
      rules: {
        code: [
          {min: 4, max: 9, message: '请输入 4 到 9 为验证码', trigger: 'blur'}
        ]
      }
    }
  },

  watch: {
    activeName: {
      handler(val) {
        if (val === 'manager') {
          this.fetchTableData()
        }
      },
      immediate: true
    },

    limitMemberNumber: {
      handler(val) {
        this.form.max_member_number = null
      }
    },

    linkObj: {
      handler(val) {
        const {uuid = undefined} = val
        this.qrContent = uuid ? `${location.protocol}//${location.host}/viewer-panel/${uuid}` : ''
      },
      deep: true
    },

    hasCode: {
      handler(val) {

        switch (val) {
          case 0:
            this.form.code = null
            break
          case 1:
            this.form.code = randomCode(9)
            break
          case 2:
            this.form.code = ''
            break
          default:
            break
        }
      },
      immediate: true
    }
  },

  methods: {
    fetchTableData() {
      api.solutionRoom
         .list({...this.pageForm})
         .then(({data}) => {
           this.tableData = data?.results ?? []
           this.count = data.count ?? 0
         })
    },

    handleBtnLinkCreateClick() {
      this.$refs['form'].validate(isValid => {
        if (isValid) {
          api.solutionRoom
             .save({...this.form, solution: this.$route.params.solutionID})
             .then(({data}) => {
               this.linkObj = data
               setTimeout(() => {
                 this.activeName = 'qrcode'
               })
               this.$message.success('链接已生成，你可以查看并保存二维码')
             })
        }
      })
    },

    handleVueQrSuccess(...args) {
      this.qrImageURI = args[0]
    },

    handleBtnQrSaveClick() {
      new JsFileDownloader({
        url: this.qrImageURI,
        filename: `解决方案二维码.png`
      })
    },

    // 复制生成链接按钮 点击事件
    handleBtnLinkCopyClick() {
      let text = this.qrContent
      text += this.linkObj.code ? `\r\n验证码：${this.linkObj.code}` : ''

      this.$copyText(text)
          .then(res => {
            this.$message.success('复制完成')
          })
    },

    handleBtnUnshareClick({id}) {
      this.$confirm('是否取消该分享？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.solutionRoom
           .remove({}, id)
           .then(res => {
             this.$message.success('已取消分享')
             this.fetchTableData()
           })
      })
    },

    handleBtnCopyClick(data) {
      let text = `链接：${location.protocol}//${location.host}/viewer-panel/${data.uuid}`
      text += data?.hasCode ? `\r\n验证码：${data.code}` : ''

      this.$copyText(text)
          .then(res => {
            this.$message.success('复制完成')
          })
    },

    handleCodeClick(data) {
      this.$copyText(data.code)
          .then(res => {
            this.$message.success('复制完成')
          })
    },

    handleOpen() {
      this.fetchTableData()
      this.activeName = 'link'
      this.hasCode = 1
      this.isLimitMemberNumber = true
      this.linkObj = null
      this.qrContent = ''
      this.form.code = randomCode(9)
    }
  }
}
</script>

<style scoped lang="scss">
.solution-sharer {
  $con-height: 370px;

  .btn-iconfont::v-deep {
    .iconfont {
      font-size: inherit;
    }

    span {
      margin-left: 4px;
    }
  }

  .dialog-con {
    height: $con-height;

    .inner-content {
      border-radius: 4px;
      height: calc($con-height - 50px);
      background-color: rgba(239, 239, 239, .4);
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .dialog-footer {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }

      .code-con {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    .bg-white {
      background: #FFFFFF;
      padding: 0;
    }
  }
}
</style>
