<template>
  <div class="app-container">
    <div style="margin: 5px 5px 5px 5px;padding:20px 20px 20px 20px;border:1px solid #E4E7ED">
      <el-row>
        <el-col :span="12">
          <div class="grid-content" style="margin: 0 0 0 15px;">{{ $t('tableReportList.reportList') }}</div>
        </el-col>
        <el-col :span="12" align="middle">
          <div class="grid-content" align="right">
            <el-button type="primary" @click="handleCreate">Add</el-button>
            <el-button type="primary">Send Test Email</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table v-loading="listLoading" :data="list" style="width:100%;margin-top:20px;" border fit highlight-current-row @expand-change="getStyle">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form :disabled="modifiable" label-position="right" inline label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item :disabled="false" :label="$t('tableReportList.id')">
                    <el-input v-model="scope.row.id" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('tableReportList.bizType')">
                    <el-input v-model="scope.row.bizType" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('tableReportList.type')">
                    <el-input v-model="scope.row.type" :disabled="true"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('tableReportList.titleHtml')">
                    <el-input v-model="scope.row.titleHtml"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('tableReportList.execOrder')">
                    <el-input v-model="scope.row.execOrder"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('tableReportList.tableSql')">
                    <el-input v-model="scope.row.tableSql" :rows="4" type="textarea"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="button-group">
              <el-button type="primary" class="actionButton" size="mini" @click="handleEdit()">{{ $t('tableReportList.edit') }}</el-button>
              <el-button type="primary" class="actionButton" size="mini" @click="handleSubmit(scope.row)">{{ $t('tableReportList.submit') }}</el-button>
            </div>
            <div style="margin: 5px 5px 5px 5px;padding:10px 10px 10px 10px;border:1px solid #E4E7ED">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content" style="margin: 0 0 0 15px;">{{ $t('tableReportList.styleList') }}</div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content" align="right">
                    <el-button type="primary" size="mini" @click="handleCreateStyle()">Add</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-table :data="styleList" style="margin-top:10px" border highlight-current-row>
                <el-table-column :label="$t('tableReportList.id')" width="60px">
                  <template slot-scope="scopeStyle">
                    <span>{{ scopeStyle.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.rowNum')">
                  <template slot-scope="scopeStyle">
                    <span>{{ scopeStyle.row.rowNum }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.colNum')">
                  <template slot-scope="scopeStyle">
                    <span>{{ scopeStyle.row.colNum }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.color')">
                  <template slot-scope="scopeStyle">
                    <span>{{ scopeStyle.row.color }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.italic')">
                  <template slot-scope="scopeStyle">
                    <span>{{ scopeStyle.row.isItalic }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.fontSize')">
                  <template slot-scope="scopeStyle">
                    <span>{{ scopeStyle.row.fontSize }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.align')">
                  <template slot-scope="scopeStyle">
                    <span>{{ scopeStyle.row.textAlign }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.actions')" prop= "actions" align="center" class-name="small-padding fixed-width">
                  <template slot-scope="scopeStyle">
                    <el-button class="actionButton" type="danger" size="mini" icon="el-icon-delete" @click="handleDeleteStyle(scopeStyle.row,scope.row)"/>
                    <el-button class="actionButton" type="primary" size="mini" icon="el-icon-edit" @click="handleEditStyle(scopeStyle.row,scope.row)"/>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('tableReportList.id')" prop="id" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.bizType')" prop="bizType">
          <template slot-scope="scope">
            <span>{{ scope.row.bizType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.titleHtml')" prop="titleHtml">
          <template slot-scope="scope">
            <span>{{ scope.row.titleHtml }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.type')" prop="type">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.execOrder')" prop="execOrder">
          <template slot-scope="scope">
            <span>{{ scope.row.execOrder }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.actions')" prop= "actions" align="center" width="330px" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
            <el-button type="primary" size="mini" icon="el-icon-rank" @click="handleDrag(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="25%" style="width: 80%; margin-left:20px;">
          <el-form-item :label="$t('tableReportList.bizType')" prop="bizType">
            <el-input :disabled="true" v-model="temp.bizType"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.titleHtml')" prop="titleHtml">
            <el-input v-model="temp.titleHtml"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.type')" prop="type">
            <el-input v-model="temp.type"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.execOrder')">
            <el-input v-model="temp.execOrder"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.tableSql')" prop="tableSql">
            <el-input v-model="temp.tableSql" type="textarea"/>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button @click="dialogFormVisible = false">{{ $t('tableReportList.cancel') }}</el-button>
          <el-button type="primary" @click="createTable" >{{ $t('tableReportList.submit') }}</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogStyleVisible" :title="textMap[dialogStatus]" width="30%">
        <el-form ref="dataForm1" :model="styleTemp" label-position="right" label-width="25%" style="margin-left:20px;">
          <el-form-item :label="$t('tableReportList.rowNum')">
            <el-input-number v-model="styleTemp.rowNum" :min="1" controls-position="right"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.colNum')">
            <el-input-number v-model="styleTemp.colNum" :min="1" controls-position="right"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.fontSize')">
            <el-input-number v-model="styleTemp.fontSize" :min="5" :max="72" controls-position="right"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.italic')">
            <el-select v-model="styleTemp.isItalic">
              <el-option v-for="item in italicOptions" :key="item.display_name" :label="item.display_name" :value="item.display_name"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.align')">
            <el-select v-model="styleTemp.textAlign">
              <el-option v-for="item in alignOption" :key="item.display_name" :lable="item.display_name" :value="item.display_name"/>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.color')">
            <el-color-picker v-model="styleTemp.color"/>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button @click="dialogStyleVisible = false">{{ $t('tableReportList.cancel') }}</el-button>
          <el-button type="primary" @click="createStyle(temp.type)" >{{ $t('tableReportList.submit') }}</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getResult_param, postData, deleteData } from '../../../api/email'
// import axios from 'axios'
const REPORT_LIST_URL = '/webapi/schedulereport/table/biz'
const POST_TABLE_URL = '/webapi/schedulereport/biz/table'
const DELET_TABLE_URL = '/webapi/schedulereport/table/biz'
const GETPOST_STYLE_URL = '/webapi/schedulereport/style'

const italicOptions = [
  { display_name: 'Y' },
  { display_name: 'N' }
]
const alignOption = [
  { display_name: 'Left' },
  { display_name: 'Center' },
  { display_name: 'Right' }
]

export default {
  name: 'ReportList',
  props: {
    bizType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: null,
      styleList: null,
      modifiable: true,
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: 'edit',
      italicOptions,
      alignOption,
      expandsFlag: true,
      // style: [{ type: '' }],
      dialogStyleVisible: false,
      textMap: {
        edit: 'Edit',
        create: 'Create'
      },
      styleTemp: {
        rowNum: 1,
        colNum: 1,
        color: '#606266',
        isItalic: 'Y',
        fontSize: 11,
        textAlign: 'Left',
        type: ''
      },
      temp: {
        bizType: this.bizType,
        type: '',
        execOrder: '',
        titleHtml: '',
        tableSql: ''
      },
      rules: {
        titleHtml: [{ required: true, message: 'Title HTML is required', trigger: 'blur' }],
        tableSql: [{ required: true, message: 'Table SQL is required', trigger: 'blur' }],
        type: [{ required: true, message: 'Order  is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getReportList()
  },
  methods: {
    getReportList() {
      this.listLoading = true
      getResult_param(REPORT_LIST_URL, this.bizType).then(response => {
        console.log(response)
        if (response.data.code === 1) {
          this.list = response.data.data
          this.listLoading = false
          console.log(444, this.list)
        }
      })
    },
    getStyle(row) {
      console.log('row111', row)
      if (this.expandsFlag === true) {
        getResult_param(`${GETPOST_STYLE_URL}/${this.bizType}`, row.type).then(res => {
          console.log('res', res)
          if (res.data.code === 1) {
            this.styleList = res.data.data
            this.styleList.type = row.type
            console.log('styleList', this.styleList)
            this.expandsFlag = false
          }
        })
      } else {
        this.expandsFlag = true
      }
    },
    handleEdit() {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.modifiable = false
    },
    handleSubmit(row) {
      console.log(555, row)
      this.listLoading = true
      const tableData = Object.assign({}, row)
      postData(POST_TABLE_URL, tableData).then(res => {
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
    },
    handleCreate() {
      this.dialogFormVisible = true
      this.temp = {}
      this.temp.bizType = this.bizType
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createTable() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.listLoading = true
          postData(POST_TABLE_URL, this.temp).then(res => {
            this.dialogFormVisible = false
            this.listLoading = false
            if (res.data.code === 1) {
              this.$notify({
                title: '成功',
                message: '提交成功',
                type: 'success',
                duration: 2000
              })
              this.getReportList()
            } else {
              this.$notify({
                title: '失败',
                message: res.data.msg,
                type: 'fail',
                duration: 2000
              })
            }
          }).catch(err => {
            console.log(err)
            this.dialogFormVisible = false
            this.listLoading = false
            this.$alert(err)
          })
        }
      })
    },
    handleDelete(row) {
      this.listLoading = true
      deleteData(DELET_TABLE_URL, row.id).then(res => {
        console.log(777, res)
        this.listLoading = false
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getReportList()
        } else {
          this.$notify({
            title: '失败',
            message: res.data.msg,
            type: 'fail',
            duration: 2000
          })
        }
      }).catch(err => {
        console.log(err)
        this.listLoading = false
        this.$alert(err)
      })
    },
    handleResetStyle() {
      this.styleTemp = {
        rowNum: 1,
        colNum: 1,
        color: '#606266',
        isItalic: 'Y',
        fontSize: 11,
        textAlign: 'Left',
        type: ''
      }
    },
    handleCreateStyle() {
      this.handleResetStyle()
      this.dialogStyleVisible = true
      this.dialogStatus = 'create'
      this.expandsFlag = true
    },
    createStyle() {
      const data = { ...this.styleTemp, bizType: this.bizType, type: this.styleList.type }
      this.type = this.styleList.type
      console.log('createStyle', data)
      this.dialogStyleVisible = false
      postData(GETPOST_STYLE_URL, data).then(res => {
        console.log('editCreate', res)
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
          this.getStyle(this.styleList)
        } else {
          this.$notify({
            title: '失败',
            message: res.data.msg,
            type: 'success',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$alert(err)
      })
    },
    handleEditStyle(stylerow, reportrow) {
      this.dialogStyleVisible = true
      this.expandsFlag = true
      this.styleTemp.id = stylerow.id
      this.styleTemp.colNum = stylerow.colNum
      this.styleTemp.rowNum = stylerow.rowNum
      this.styleTemp.isItalic = stylerow.isItalic
      this.styleTemp.textAlign = stylerow.textAlign
      this.styleTemp.color = stylerow.color
      this.styleTemp.color = stylerow.fontSize
      this.styleTemp.type = reportrow.type
      this.type = reportrow.type
      this.expandsFlag = true
      console.log('style', this.type)
    },
    handleDeleteStyle(stylerow) {
      console.log('deleterow', stylerow)
      deleteData(GETPOST_STYLE_URL, stylerow.id).then(res => {
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.expandsFlag = true
          this.getStyle(stylerow)
        }
      }).catch(err => {
        this.$alert(err)
      })
    }
  }
}
</script>
<style scoped>
  .actionButton.el-button{
    margin:4px 0px 4px 10px
  }
  .button-group {
    text-align: right;
    padding-right:0
  }
  .table-expand .el-button{
    margin-right: 20px;
  }
</style>
