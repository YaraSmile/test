<template>
  <div class="app-container">
    <div style="margin: 5px 5px 5px 5px;padding:20px 20px 20px 20px;border:1px solid #E4E7ED">
      <el-row>
        <el-col :span="12">
          <div class="grid-content" style="margin: 0 0 0 15px;">{{ $t('tableReportList.reportList') }}</div>
        </el-col>
        <el-col :span="12" align="middle">
          <div class="grid-content" align="right">
            <el-button type="primary">Send Test Email</el-button>
          </div>
        </el-col>
      </el-row>
      <el-form v-loading="listLoading" :disabled="modifiable" label-position="right" inline label-width="130px" style="margin-top:10px">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('excelReportList.bizType')">
              <el-input v-model="temp.bizType" disabled=""/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('excelReportList.excelFileName')">
              <el-input v-model="temp.excelFileName"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('excelReportList.fileType')">
              <el-input v-model="temp.fileType"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('excelReportList.attachmentDateformate')">
              <el-input v-model="temp.attachmentDateformate"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('excelReportList.mailHtmlContent')">
              <el-input v-model="temp.mailHtmlContent" :rows="4" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('excelReportList.excelReportSql')">
              <el-input v-model="temp.excelReportSql" :rows="4" type="textarea"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="button-group">
        <el-button :disabled="!modifiable" type="primary" class="actionButton" size="mini" @click="handleEdit()">{{ $t('tableReportList.edit') }}</el-button>
        <el-button :disabled="modifiable" type="primary" class="actionButton" size="mini" @click="handleSubmit()">{{ $t('tableReportList.submit') }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getResult_param, postData } from '../../../api/email'
import { GET_EXCEL_URL, POST_EXCEL_URL } from '@/api/constants'

export default {
  name: 'ExcelReportList',
  props: {
    bizType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: null,
      modifiable: true,
      listLoading: false,
      temp: {
        id: '',
        bizType: this.bizType,
        excelFileName: '',
        fileType: '',
        attachmentDateformate: '',
        mailHtmlContent: '',
        excelReportSql: ''
      }
      // rules: {
      //   titleHtml: [{ required: true, message: 'Title HTML is required', trigger: 'blur' }],
      //   tableSql: [{ required: true, message: 'Table SQL is required', trigger: 'blur' }],
      //   type: [{ required: true, message: 'Order  is required', trigger: 'blur' }]
      // }
    }
  },
  created() {
    this.getExcelReportList()
  },
  methods: {
    getExcelReportList() {
      this.listLoading = true
      getResult_param(GET_EXCEL_URL, this.bizType).then(response => {
        this.listLoading = false
        console.log('resp', response)
        if (response.data.code === 1) {
          this.list = response.data.data
          this.listLoading = false
          this.temp.id = this.list.id
          this.temp.bizType = this.bizType
          this.temp.excelFileName = this.list.excelFileName
          this.temp.fileType = this.list.fileType
          this.temp.attachmentDateformate = this.list.attachmentDateformate
          this.temp.mailHtmlContent = this.list.mailHtmlContent
          this.temp.excelReportSql = this.list.excelReportSql
        } else {
          this.$notify({
            title: '失败',
            message: response.data.msg,
            type: 'success',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$alert(err)
      })
    },
    handleEdit() {
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
      this.modifiable = false
    },
    handleSubmit() {
      this.listLoading = true
      const excelData = Object.assign({}, this.temp)
      if (!excelData.id) {
        delete excelData.id
      }
      postData(POST_EXCEL_URL, excelData).then(res => {
        this.listLoading = false
        console.log(66, res)
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.modifiable = true
        } else {
          this.$notify({
            title: '失败',
            message: res.data.msg,
            type: 'fail',
            duration: 1000
          })
        }
      }).catch(err => {
        console.log(err)
        this.listLoading = false
        this.$alert(err)
      })
    }
  }
}
</script>
<style>
  .el-form-item{
    width:100%
  }
  .el-form-item__content{
    width:80%
  }
  .el-input{
    width:100%
  }
  .actionButton.el-button{
    margin:4px 0px 4px 10px
  }
  .button-group {
    text-align: right;
    padding-right:0
  }
</style>
