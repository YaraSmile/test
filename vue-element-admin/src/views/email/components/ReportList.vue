<template>
  <div class="app-container">
    <div style="margin: 5px 5px 5px 5px;padding:20px 20px 20px 20px;border:1px solid #E4E7ED">
      <el-row>
        <el-col :span="12">
          <div class="grid-content" style="margin: 0 0 0 15px;">{{ $t('reportList.reportList') }}</div>
        </el-col>
        <el-col :span="12" align="middle">
          <div class="grid-content" align="right">
            <el-button type="primary" @click="handleCreate">Add</el-button>
            <el-button type="primary">Send Test Email</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table v-loading="listLoading" :data="list" style="width:100%;margin-top:20px;" border fit highlight-current-row>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form :disabled="modifiable" label-position="right" inline label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item :disabled="false" :label="$t('reportList.id')">
                    <el-input v-model="scope.row.id" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('reportList.bizType')">
                    <el-input v-model="scope.row.bizType" :disabled="true"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('reportList.type')">
                    <el-input v-model="scope.row.type" :disabled="true"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('reportList.titleHtml')">
                    <el-input v-model="scope.row.titleHtml"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('reportList.execOrder')">
                    <el-input v-model="scope.row.execOrder"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('reportList.tableSql')">
                    <el-input v-model="scope.row.tableSql" :rows="4" type="textarea" style="width:500px"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="button-group">
              <el-button type="primary" size="mini" @click="handleEdit()">{{ $t('reportList.edit') }}</el-button>
              <el-button type="primary" size="mini" @click="handleSubmit(scope.$index,scope.row)">{{ $t('reportList.submit') }}</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('reportList.id')" prop="id" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('reportList.bizType')" prop="bizType">
          <template slot-scope="scope">
            <span>{{ scope.row.bizType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('reportList.titleHtml')" prop="titleHtml">
          <template slot-scope="scope">
            <span>{{ scope.row.titleHtml }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('reportList.type')" prop="type">
          <template slot-scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('reportList.execOrder')" prop="type">
          <template slot-scope="scope">
            <span>{{ scope.row.execOrder }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('reportList.actions')" prop= "actions" align="center" width="330px" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
            <el-button type="primary" size="mini" icon="el-icon-rank" @click="handleDrag(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="90px" style="width: 400px; margin-left:20px;">
          <el-form-item :label="$t('reportList.bizType')" prop="bizType">
            <el-input :disabled="true" v-model="temp.bizType"/>
          </el-form-item>
          <el-form-item :label="$t('reportList.titleHtml')" prop="titleHtml">
            <el-input v-model="temp.titleHtml"/>
          </el-form-item>
          <el-form-item :label="$t('reportList.type')" prop="type">
            <el-input v-model="temp.type"/>
          </el-form-item>
          <el-form-item :label="$t('reportList.execOrder')">
            <el-input v-model="temp.execOrder"/>
          </el-form-item>
          <el-form-item :label="$t('reportList.tableSql')" prop="tableSql">
            <el-input v-model="temp.tableSql" type="textarea"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ $t('reportList.cancel') }}</el-button>
          <el-button type="primary" @click="createTable" >{{ $t('reportList.submit') }}</el-button>
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
      modifiable: true,
      listLoading: false,
      dialogFormVisible: false,
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
    // handleCreate() {
    // },
    handleEdit(index) {
      this.modifiable = false
    },
    handleSubmit(index, row) {
      console.log(555, row)
      this.listLoading = true
      const tableData = Object.assign({}, row)
      // tableData.execOrder = index + 1
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
    }
  }
}
</script>
<style>
  .button-group {
    padding-left:80%
  }
  .table-expand .el-button{
    margin-right: 20px;
  }
</style>
