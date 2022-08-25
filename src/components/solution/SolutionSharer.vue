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
          <el-tab-pane label="链接分享" name="link">
            <div class="inner-content">

              <el-form
                label-position="left"
                label-width="80px"
                ref="form"
                :model="form"
                :rules="rules"
              >
                <el-form-item label="分享形式" prop="name">
                  <el-radio-group v-model="form.hasCode">
                    <el-radio :label="0">无验证码</el-radio>
                    <el-radio :label="1">
                      随机验证码&nbsp;&nbsp;
                      <el-input
                        v-if="form.hasCode === 1"
                        disabled
                        :value="form.code"
                        style="width: 110px;"
                      />
                    </el-radio>
                    <el-radio :label="2">
                      手动设置验证码&nbsp;&nbsp;
                      <el-input
                        v-if="form.hasCode === 2"
                        clearable
                        :minlength="4"
                        :maxlength="9"
                        placeholder="重复使用相同验证码有泄漏风险"
                        style="width: 220px;"
                        v-model="form.code"
                      />
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="访问人数" prop="name">
                  <el-radio-group v-model="form.limitMemberNumber">
                    <el-radio :label="false">不限制</el-radio>
                    <el-radio :label="true">
                      限制总访问人数&nbsp;&nbsp;
                      <el-input-number
                        v-if="form.limitMemberNumber"
                        :min="1"
                        :max="50"
                        v-model="form.maxMemberNumber"
                      />
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="有效期" prop="name">
                  <el-radio-group v-model="form.expirationDate">
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
          <el-tab-pane label="生成二维码" name="qrcode">
            <div v-loading="isLoading" class="inner-content">
              <div class="code-con">
                <vue-qr
                  :size="210"
                  :text="linkUrl"
                  :callback="handleVueQrSuccess"
                />
                <el-button
                  size="small"
                  style="margin-top: 24px; width: 100%;"
                  type="primary"
                  @click="handleBtnQrSaveClick"
                >
                  保存二维码
                </el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="管理已分享链接" name="manager">
            <div class="inner-content bg-white">
              <el-table :data="tableData" width="450" height="350">
                <el-table-column label="操作" align="center" width="220">
                  <template v-slot="scope">
                    <el-button type="danger" @click="handleBtnUnshareClick(scope.row)">取消分享</el-button>
                    <el-button type="primary" @click="handleBtnCopyClick(scope.row)">复制链接</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="hasCode" align="center" label="验证码">
                  <template v-slot="scope">
                    <el-tag v-if="scope.row.hasCode === 0" effect="dark">无验证码</el-tag>
                    <el-tooltip v-else class="item" effect="dark" content="点击复制验证码" placement="top-start">
                      <el-tag
                        effect="dark"
                        style="cursor: pointer;"
                        @click="handleCodeClick(scope.row)"
                      >
                        {{ scope.row.code }}
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
                <el-table-column prop="update_time" align="center" label="创建日期"/>
                <el-table-column prop="expirationDate" align="center" label="有效期（天）"/>
                <el-table-column prop="expirationDate" align="center" label="剩余有效期（天）"/>
              </el-table>

              <el-pagination
                layout="total, prev, pager, next, jumper"
                style="margin-top: 12px;"
                :current-page="controlsForm.page"
                :page-size="controlsForm.page_size"
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
import commonElDialogMixin from '@/mixins/common-el-dialog-mixin'
import VueQr from 'vue-qr/dist/vue-qr'
import JsFileDownloader from 'js-file-downloader'
import commonElTableMixin from '@/mixins/common-el-table-mixin'
import {BASE_URL} from '@/config'

export default {
  name: "SolutionSharer",

  components: {VueQr},

  mixins: [commonElDialogMixin, commonElTableMixin],

  data() {
    return {
      isLoading: false,
      activeName: 'link',
      linkUrl: '',
      qrImageURI: null,
      tableData: [
        {
          code: 'geng',
          hasCode: 2,
          limitMemberNumber: true,
          maxMemberNumber: 20,
          expirationDate: 7,
          update_time: '2022-09-09'
        },
        {
          code: 'geng',
          hasCode: 2,
          limitMemberNumber: true,
          maxMemberNumber: 20,
          expirationDate: 7,
          update_time: '2022-09-09'
        },
        {
          code: 'geng',
          hasCode: 2,
          limitMemberNumber: true,
          maxMemberNumber: 20,
          expirationDate: 7,
          update_time: '2022-09-09'
        },
        {
          code: 'geng',
          hasCode: 2,
          limitMemberNumber: true,
          maxMemberNumber: 20,
          expirationDate: 7,
          update_time: '2022-09-09'
        },
        {
          code: 'geng',
          hasCode: 2,
          limitMemberNumber: true,
          maxMemberNumber: 20,
          expirationDate: 7,
          update_time: '2022-09-09'
        },
        {
          code: 'geng',
          hasCode: 2,
          limitMemberNumber: true,
          maxMemberNumber: 20,
          expirationDate: 7,
          update_time: '2022-09-09'
        },
        {
          code: 'geng',
          hasCode: 2,
          limitMemberNumber: false,
          maxMemberNumber: null,
          expirationDate: 7,
          update_time: '2022-09-09'
        },
        {
          code: null,
          hasCode: 0,
          limitMemberNumber: true,
          maxMemberNumber: 20,
          expirationDate: 7,
          update_time: '2022-09-09'
        }
      ],
      form: {
        // 验证码
        code: null,
        // 分享形式
        hasCode: 1, // { 0: '无验证码', 1: '随机验证码', 2: '手动设置验证码' }
        // 是否显示总访问人数
        limitMemberNumber: false,
        // 最大总访问人数
        maxMemberNumber: 1,
        // 过期天数
        expirationDate: 7
      }
    }
  },

  watch: {
    activeName: {
      handler(val) {
        if (val === 'qrcode') {
          // todo 获取二维码地址
          // this.linkUrl = ''
          this.isLoading = true
          setTimeout(() => {
            this.isLoading = false
          }, 200)
        }
      },
      immediate: true
    },
    'form.hasCode': {
      handler(val, oldVal) {
        const randomCode = () => {
          const source = Array.from('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+')
          const res = []
          while (res.length !== 9) {
            res.push(source[Math.floor(Math.random() * source.length)])
          }

          return res.join('')
        }

        if (val !== oldVal) {
          switch (val) {
            case 0:
              this.form.code = null
              break
            case 1:
              this.form.code = randomCode()
              break
            case 2:
              this.form.code = ''
              break
            default:
              break
          }
        }
      },
      immediate: true
    }
  },

  methods: {
    fetchTableData() {

    },

    handleBtnLinkCreateClick() {
      // todo 提交表单获取 链接地址
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

    handleBtnUnshareClick({id}) {
      this.$confirm('是否取消该分享？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // todo
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
      this.activeName = 'link'
    }
  }
}
</script>

<style scoped lang="scss">
.solution-sharer {
  $con-height: 370px;

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
