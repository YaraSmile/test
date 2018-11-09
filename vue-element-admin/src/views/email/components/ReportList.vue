<template>
  <div class="app-container">
    <div style="margin: 5px 5px 5px 5px;padding:20px 20px 20px 20px;border:1px solid #E4E7ED">
      <el-row>
        <el-col :span="12">
          <div class="grid-content" style="margin: 0 0 0 15px;">{{ $t('tableReportList.reportList') }}</div>
        </el-col>
        <el-col :span="12" align="middle">
          <div class="grid-content" align="right">
            <el-button type="primary" class="actionButton" size="mini" @click="handleCreate">Add</el-button>
            <el-button type="primary" class="actionButton" size="mini" >Send Test Email</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table v-loading="listLoading" :data="list" style="width:100%;margin-top:20px;" border fit highlight-current-row @expand-change="getExpandInfo">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form :disabled="modifiable" label-position="right" inline label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('tableReportList.id')">
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
            <div class="button-group" style="margin-right: 50px;">
              <el-button :disabled="!modifiable" type="primary" class="actionButton" size="mini" @click="handleEdit()">{{ $t('tableReportList.edit') }}</el-button>
              <el-button :disabled="modifiable" type="primary" class="actionButton" size="mini" @click="submitTable(scope.row)">{{ $t('tableReportList.submit') }}</el-button>
            </div>
            <div style="margin: 5px 5px 10px 5px;padding:10px 10px 10px 10px;border:1px solid #E4E7ED">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content" style="margin: 0 0 0 15px;">{{ $t('tableReportList.styleList') }}</div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content" align="right" style="margin-right: 35px;margin-bottom: 10px">
                    <el-button type="primary" size="mini" @click="handleCreateStyle(scope.row)">Add</el-button>
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
                <el-table-column :label="$t('tableReportList.isMergeCol')">
                  <template slot-scope="scopeStyle">
                    <span>{{ scopeStyle.row.isMergeCol }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.actions')" align="center">
                  <template slot-scope="scopeStyle">
                    <el-button class="actionButton" type="danger" size="mini" icon="el-icon-delete" @click="deleteStyle(scopeStyle.row)"/>
                    <el-button class="actionButton" type="primary" size="mini" icon="el-icon-edit" @click="handleEditStyle(scopeStyle.row,scope.row)"/>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div style="margin: 5px 5px 10px 5px;padding:10px 10px 10px 10px;border:1px solid #E4E7ED">
              <el-row>
                <el-col :span="12">
                  <div class="grid-content" style="margin: 0 0 0 15px;">{{ $t('tableReportList.tableHeadList') }}</div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content" align="right" style="margin-right: 35px;margin-bottom: 10px">
                    <el-button type="primary" size="mini" @click="handleCreateTableHead(scope.row)">Add</el-button>
                  </div>
                </el-col>
              </el-row>
              <el-table :data="tableHeadList" style="margin-top:10px" border highlight-current-row>
                <el-table-column :label="$t('tableReportList.id')" width="70px">
                  <template slot-scope="scopeTableHead">
                    <span>{{ scopeTableHead.row.id }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.headColumnName')">
                  <template slot-scope="scopeTableHead">
                    <span>{{ scopeTableHead.row.headcolumnName }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.headColumnOrder')">
                  <template slot-scope="scopeTableHead">
                    <span>{{ scopeTableHead.row.headcolumnOrder }}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('tableReportList.actions')" align="center">
                  <template slot-scope="scopeTableHead">
                    <el-button class="actionButton" type="danger" size="mini" icon="el-icon-delete" @click="deleteTableHead(scopeTableHead.row,scope.row)"/>
                    <el-button class="actionButton" type="primary" size="mini" icon="el-icon-edit" @click="handleEditTableHead(scopeTableHead.row,scope.row)"/>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </template>
        </el-table-column>

        <el-table-column :label="$t('tableReportList.id')" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.bizType')">
          <template slot-scope="scope">
            <span>{{ scope.row.bizType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.titleHtml')">
          <template slot-scope="scope">
            <span>{{ scope.row.titleHtml }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.type')">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.execOrder')" width="70px">
          <template slot-scope="scope">
            <span>{{ scope.row.execOrder }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('tableReportList.actions')" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" class="actionButton" size="mini" icon="el-icon-delete" @click="deleteTable(scope.row)"/>
            <el-button type="primary" class="actionButton" size="mini" icon="el-icon-rank" disabled @click="handleDrag(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="25%" style="width: 80%; margin-left:20px;">
          <el-form-item :label="$t('tableReportList.bizType')">
            <el-input :disabled="true" v-model="temp.bizType"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.titleHtml')" prop="titleHtml">
            <el-input v-model="temp.titleHtml"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.type')" prop="type">
            <el-input v-model="temp.type"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.execOrder')">
            <el-input-number v-model="temp.execOrder" :min="1"/>
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
        <el-form :model="styleTemp" label-position="right" label-width="25%" style="margin-left:20px;">
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
          <el-form-item :label="$t('tableReportList.isMergeCol')">
            <el-select v-model="styleTemp.isMergeCol">
              <el-option v-for="item in isMergeColOptions" :key="item.display_name" :label="item.display_name" :value="item.display_name"/>
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
          <el-button type="primary" @click="createStyle()" >{{ $t('tableReportList.submit') }}</el-button>
        </div>
      </el-dialog>

      <el-dialog :visible.sync="dialogTableListVisible" :title="textMap[dialogStatus]" width="35%">
        <el-form :model="tableHeadTemp" label-position="right" label-width="30%" style="margin-left:5px;">
          <el-form-item :label="$t('tableReportList.headColumnName')">
            <el-input v-model="tableHeadTemp.headcolumnName" style="width:80%;"/>
          </el-form-item>
          <el-form-item :label="$t('tableReportList.headColumnOrder')">
            <el-input-number v-model="tableHeadTemp.headcolumnOrder" :min="1" controls-position="right"/>
          </el-form-item>
        </el-form>
        <div style="text-align:center">
          <el-button @click="dialogTableListVisible = false">{{ $t('tableReportList.cancel') }}</el-button>
          <el-button type="primary" @click="createTableHead()" >{{ $t('tableReportList.submit') }}</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import { getResult_param, postData, deleteData, getResult } from '../../../api/email'
import waves from '@/directive/waves' // 水波纹指令
import { REPORT_LIST_URL, POST_TABLE_URL, DELET_TABLE_URL, GETPOST_STYLE_URL, GET_TABLEHEAD_URL, DELETE_TABLEHEAD_URL, POST_TABLEHEAD_URL } from '@/api/constants'
import { italicOptions, alignOption, isMergeColOptions } from '@/api/constants'

export default {
  name: 'ReportList',
  directives: {
    waves
  },
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
      tableHeadList: null,
      modifiable: true,
      listLoading: false,
      dialogFormVisible: false,
      dialogStatus: 'edit',
      italicOptions,
      alignOption,
      isMergeColOptions,
      dialogStyleVisible: false,
      textMap: {
        edit: 'Edit',
        create: 'Create'
      },
      dialogTableListVisible: false,
      styleTemp: {
        rowNum: 1,
        colNum: 1,
        color: '#606266',
        isItalic: 'Y',
        isMergeCol: 'N',
        fontSize: 11,
        textAlign: 'Left',
        type: ''
      },
      tableHeadTemp: {
        id: '',
        headcolumnName: '',
        headcolumnOrder: '',
        tableId: ''
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
      this.listLoading = true
      getResult_param(`${GETPOST_STYLE_URL}/${row.bizType}`, row.type).then(
        res => {
          this.listLoading = false
          console.log('res', res)
          if (res.data.code === 1) {
            this.styleList = res.data.data
            this.styleList.type = row.type
            console.log('styleList', this.styleList)
          } else {
            this.$notify({
              title: '失败',
              message: res.data.msg,
              type: 'error',
              duration: 1000
            })
          }
        }).catch(err => {
        this.$alert(err)
      })
    },
    getTableHeadList(row) {
      getResult(`${GET_TABLEHEAD_URL}/${row.id}/columns`, row.id).then(res => {
        if (res.data.code === 1) {
          this.tableHeadList = res.data.data
        } else {
          this.$notify({
            title: '失败',
            message: res.data.msg,
            type: 'error',
            duration: 1000
          })
        }
      }).catch(err => {
        this.$alert(err)
      })
    },
    getExpandInfo(row) {
      this.getStyle(row)
      this.getTableHeadList(row)
    },
    // report list
    handleEdit() {
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
      this.modifiable = false
    },
    submitTable(row) {
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
            type: 'error',
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
                message: '提交成功!',
                type: 'success',
                duration: 2000
              })
              this.getReportList()
            } else {
              this.$notify({
                title: '失败',
                message: res.data.msg,
                type: 'error',
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
    deleteTable(row) {
      this.$confirm('Are you sure delete this table?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancle',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteData(DELET_TABLE_URL, row.id).then(res => {
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
              type: 'error',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err)
          this.listLoading = false
          this.$alert(err)
        })
      }
      ).catch(() => {
        this.listLoading = false
      })
    },
    // style list
    handleResetStyle() {
      this.styleTemp = {
        rowNum: 1,
        colNum: 1,
        color: '#606266',
        isItalic: 'Y',
        isMergeCol: 'N',
        fontSize: 11,
        textAlign: 'Left',
        type: ''
      }
    },
    handleCreateStyle(row) {
      this.handleResetStyle()
      this.styleTemp.type = row.type
      this.dialogStyleVisible = true
      this.dialogStatus = 'create'
    },
    createStyle() {
      const data = { ...this.styleTemp, bizType: this.bizType }
      console.log('createStyle', data)
      this.dialogStyleVisible = false
      this.listLoading = true
      postData(GETPOST_STYLE_URL, data).then(res => {
        this.listLoading = false
        console.log('editCreate', res)
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '提交成功!',
            type: 'success',
            duration: 2000
          })
          this.getStyle({ bizType: this.bizType, type: this.styleTemp.type })
        } else {
          this.$notify({
            title: '失败',
            message: res.data.msg,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$alert(err)
      })
    },
    handleEditStyle(stylerow, reportrow) {
      this.dialogStyleVisible = true
      this.styleTemp.id = stylerow.id
      this.styleTemp.colNum = stylerow.colNum
      this.styleTemp.rowNum = stylerow.rowNum
      this.styleTemp.isItalic = stylerow.isItalic
      this.styleTemp.isMergeCol = stylerow.isMergeCol
      this.styleTemp.textAlign = stylerow.textAlign
      this.styleTemp.color = stylerow.color
      this.styleTemp.fontSize = stylerow.fontSize
      this.styleTemp.type = reportrow.type
    },
    deleteStyle(stylerow) {
      this.$confirm('Are you sure delete this style?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancle',
        type: 'warning'
      }).then(() => {
        deleteData(GETPOST_STYLE_URL, stylerow.id).then(res => {
          if (res.data.code === 1) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getStyle(stylerow)
          } else {
            this.$notify({
              title: '失败',
              message: res.data.msg,
              type: 'error',
              duration: 2000
            })
          }
        }).catch(err => {
          this.$alert(err)
        })
      }).catch(_ => {})
    },
    // table head list
    handleResetTableHead() {
      this.tableHeadTemp = {
        headcolumnName: '',
        headcolumnOrder: 0
      }
    },
    handleCreateTableHead(row) {
      this.handleResetTableHead()
      this.dialogTableListVisible = true
      this.dialogStatus = 'create'
      this.tableHeadTemp.tableId = row.id
    },
    deleteTableHead(tableHeadRow, row) {
      this.$confirm('Are you sure delete this table head?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteData(DELETE_TABLEHEAD_URL, tableHeadRow.id).then(res => {
          if (res.data.code === 1) {
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
            this.getTableHeadList(row)
          } else {
            this.$notify({
              title: '失败',
              message: res.data.msg,
              type: 'error',
              duration: 2000
            })
          }
        })
      }).catch(_ => {})
    },
    handleEditTableHead(tableHeadRow, row) {
      this.dialogTableListVisible = true
      this.tableHeadTemp.id = tableHeadRow.id
      this.tableHeadTemp.headcolumnName = tableHeadRow.headcolumnName
      this.tableHeadTemp.headcolumnOrder = tableHeadRow.headcolumnOrder
      this.tableHeadTemp.tableId = row.id
    },
    createTableHead() {
      const data = { ...this.tableHeadTemp }
      this.dialogTableListVisible = false
      this.listLoading = true
      postData(POST_TABLEHEAD_URL, data).then(res => {
        this.listLoading = false
        if (res.data.code === 1) {
          this.$notify({
            title: '成功',
            message: '提交成功!',
            type: 'success',
            duration: 2000
          })
          this.getTableHeadList({ id: this.tableHeadTemp.tableId })
        } else {
          this.$notify({
            title: '失败',
            message: res.data.msg,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(err => {
        this.$alert(err)
      })
    }
  }
}
</script>
<style scoped>
  .button-group {
    text-align: right;
    padding-right:0
  }
  .table-expand .el-button{
    margin-right: 20px;
  }
</style>
