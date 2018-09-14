<template>
  <div class="app-container">
    <div style="margin: 5px 5px 5px 5px;padding:20px 10px 10px 20px;border:1px solid #E4E7ED">
      <el-row>
        <el-col :span="12">
          <div style="margin: 0 0 20px 15px;">{{ $t('tableReportList.emailHtml') }}</div>
        </el-col>
        <el-col :span="12">
          <div style="margin-right:15px;margin-bottom:15px;" align="right">
            <el-button type="primary" icon="el-icon-edit" @click="handleEdit()">{{ $t('tableReportList.edit') }}</el-button>
            <el-button type="primary" icon="el-icon-check" @click="confirmEmail()">{{ $t('tableReportList.submit') }}</el-button>
          </div>
        </el-col>
      </el-row>
      <el-form v-loading="listLoading" :disabled="modifiedEmail" label-position="right" inline label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('tableReportList.header')">
              <el-input v-model="header.contentHtml" :rows="4" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$t('tableReportList.tail')" prop="bizType">
          <el-input v-model="footer.contentHtml" :rows="4" type="textarea"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getResult_param, postData } from '../../../api/email'
import axios from 'axios'
const GETPOST_EMAILHTML_URL = '/webapi/schedulereport/biz/table/html'

export default {
  name: 'EmailHTML',
  props: {
    bizType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      header: {},
      footer: {},
      modifiedEmail: true,
      listLoading: false
    }
  },
  created() {
    this.getEmailHTML()
  },
  methods: {
    getEmailHTML() {
      this.listLoading = true
      getResult_param(GETPOST_EMAILHTML_URL, this.bizType).then(res => {
        this.listLoading = false
        console.log(3333, res)
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].type === 'head') {
              this.header = res.data.data[i]
            }
            if (res.data.data[i].type === 'foot') {
              this.footer = res.data.data[i]
            }
          }
        } else {
          this.$notify({
            title: '失败',
            message: res.data.msg,
            type: 'fail',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$alert(err)
        console.log(err)
      })
    },
    handleEdit() {
      this.modifiedEmail = false
    },
    confirmEmail() {
      const ts = this
      let headerHtml = {}
      let footerHtml = {}
      console.log('headerid', !this.header.id)
      console.log('headerhtml', this.header.contentHtml)
      console.log('footerhtml', this.footer.contentHtml)
      if (this.header.id) {
        headerHtml = Object.assign({}, this.header)
        footerHtml = Object.assign({}, this.footer)
      } else {
        headerHtml.type = 'head'
        headerHtml.bizType = this.bizType
        headerHtml.contentHtml = this.header.contentHtml
        footerHtml.type = 'foot'
        footerHtml.bizType = this.bizType
        footerHtml.contentHtml = this.footer.contentHtml
        console.log('head', headerHtml)
        console.log('foot', footerHtml)
      }
      console.log('head1', headerHtml)
      console.log('foot1', footerHtml)
      axios.all([postData(GETPOST_EMAILHTML_URL, headerHtml), postData(GETPOST_EMAILHTML_URL, footerHtml)]).then(
        axios.spread(function(acct, perms) {
          console.log('acct', acct)
          console.log('perms', perms)
          if (acct.data.code === 1 && perms.data.code === 1) {
            ts.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            ts.modifiedEmail = true
          } else {
            const msg = acct.data.msg.toLocaleUpperCase() !== 'SUCCESS' ? acct.data.msg : perms.data.msg
            ts.$notify({
              title: '失败',
              message: msg,
              type: 'fail',
              duration: 2000
            })
          }
        })
      )
    }
  }
}
</script>
<style>
  .el-form-item {
    width:100%
  }
  .el-form-item__content {
    width:80%
  }
</style>
