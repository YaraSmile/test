<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input :placeholder="$t('email.type')" v-model="listQuery.type" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.template" :placeholder="$t('email.templateName')" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in templateOptions" :key="item.key" :label="item.display_name" :value="item.display_name"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('email.search') }}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('email.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;min-height:1000px;">
      <el-table-column :label="$t('email.id')" prop="id" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('email.type')" width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.bizType }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('email.desc')" min-width="10px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bizDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('email.scheduleTime')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.scheduleTimeExpr }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('email.templateName')" width="110px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.templateName }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('email.actions')" align="center" width="330px" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleView(scope.row)">{{ $t('email.view') }}</el-button>
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">{{ $t('email.edit') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('email.delete') }}</el-button>
          <el-button :disabled="publish_disabled" type="primary" size="mini" @click="handlePublish(scope.row)">{{ $t('email.publish') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination :current-page="listQuery.pageNo" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="150px" style="width: 400px; margin-left:10px;">
        <el-form-item :label="$t('email.type')" prop="bizType">
          <el-input :disabled="modifiable" v-model="temp.bizType"/>
        </el-form-item>
        <el-form-item :label="$t('email.desc')">
          <el-input v-model="temp.bizDesc" type="textarea"/>
        </el-form-item>
        <el-form-item :label="$t('email.mailTitle')" prop="mailTitle">
          <el-input v-model="temp.mailTitle"/>
        </el-form-item>
        <el-form-item :label="$t('email.mailTitleDateFormat')">
          <el-select v-model="temp.mailTitleDateFormat" class="filter-item" style="width:250px">
            <el-option v-for="item in emailDateFormatOptions" :key="item.display_name" :label="item.display_name" :value="item.display_name"/>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('email.scheduleTime')" prop="scheduleTimeExpr">
          <el-input v-model="temp.scheduleTimeExpr" placeholder="* * * * * ?"/>
        </el-form-item>
        <el-form-item :label="$t('email.templateName')" prop="templateName">
          <el-select v-model="temp.templateName" :disabled="modifiable" class="filter-item" prop="templateName" style="width:250px">
            <el-option v-for="item in templateOptions" :key="item.display_name" :label="item.display_name" :value="item.display_name"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('email.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('email.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('email.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import { getResult, postData, deleteData, postData_param } from '@/api/email'
import qs from 'qs'

import waves from '@/directive/waves' // 水波纹指令

const templateOptions = [
  { display_name: 'Table' },
  { display_name: 'Excel' }
]

const emailDateFormatOptions = [
  { display_name: 'yyyyMMdd' }
]

const POST_LIST_URL = '/webapi/biz'
const GET_LIST_URL = '/webapi/schedulereport/biz'
const POST_PUBLISH_URL = '/webapi/biz/publish'

export default {
  name: 'EmailReport',
  directives: {
    waves
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        pageNo: 1,
        pageSize: 50,
        type: undefined,
        template: undefined
      },
      templateOptions,
      emailDateFormatOptions,
      // statusOptions: ['published', 'draft', 'deleted'],
      temp: {
        id: undefined,
        bizType: '',
        bizDesc: '',
        scheduleTimeExpr: '',
        mailTitle: '',
        mailTitleDateFormat: '',
        templateName: 'Table',
        isValid: ''
      },
      dialogFormVisible: false,
      modifiable: false,
      publish_disabled: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      confirmVisible: false,
      rules: {
        bizType: [{ required: true, message: 'Biz Type is required', trigger: 'change' }],
        scheduleTimeExpr: [{ required: true, message: 'Schedule Time is required', trigger: 'change' }],
        mailTitle: [{ required: true, message: 'Mail Title is required', trigger: 'blur' }],
        mailTitleDateFormat: [{ required: true, message: 'EMail  is required', trigger: 'blur' }],
        templateName: [{ required: true, message: 'Template  is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getResult(GET_LIST_URL, this.listQuery).then(response => {
        if (response.data.code === 1) {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        }
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        bizType: '',
        bizDesc: '',
        scheduleTimeExpr: '',
        mailTitle: '',
        mailTitleDateFormat: 'yyyyMMdd',
        templateName: 'Table',
        isValid: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.modifiable = false
      this.publish_disabled = false
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const dataTemp = Object.assign({}, this.temp)
          delete dataTemp.id
          console.log(1111111, dataTemp)
          postData(POST_LIST_URL, dataTemp).then(response => {
            if (response.data.code === 1) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$alert(response.data.msg)
            }
          }).catch((e) => {
            console.log(e)
            this.$alert(e)
          })
        }
      })
    },
    handleEdit(row) {
      this.copyData(this.temp, row)
      console.log(222, this.temp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.modifiable = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          console.log(333, tempData)
          postData(POST_LIST_URL, tempData).then((response) => {
            if (response.data.code === 1) {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            } else {
              this.$alert(response.data.msg)
            }
          }).catch(e => {
            this.dialogFormVisible = false
            console.log(e)
            this.$alert(e)
          })
        }
      })
    },
    handleView(row) {
      if (row.templateName.toLocaleUpperCase() === 'TABLE') {
        this.$router.push({ path: '/emailReport/emailView', query: { bizType: row.bizType }})
      } else if (row.templateName.toLocaleUpperCase() === 'EXCEL') {
        // this.$router.push({ push: '/emailReport/emailDetail', query: { bizType: row.bizType}})
      } else {
        this.$message({
          type: 'warning',
          message: 'Please check your Biz List!',
          duration: 2000
        })
      }
    },
    handlePublish(row) {
      this.copyData(this.temp, row)
      this.$confirm('This action will publish email, are you sure?', 'Tips', {
        confirmButtonText: 'Publish',
        cancelButtonText: 'Cancle',
        type: 'warning'
      }).then(() => {
        this.temp.isValid = 0
        postData_param(POST_PUBLISH_URL, this.temp.bizId).then((response) => {
          if (response.data.code === 1) {
            this.publish_disabled = false
            this.$message({
              type: 'success',
              message: ' Published Success!',
              duration: 2000
            })
          }
        }).catch(err => {
          this.alert(err)
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: ' Cancled.'
        })
      })
    },
    handleDelete(row) {
      this.$confirm('This action will delete this Biz List, are you sure?', 'Tips', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancle',
        type: 'warning'
      }).then(() => {
        this.temp.isValid = 0
        deleteData(POST_LIST_URL, row.id).then((response) => {
          console.log(888, response)
          if (response.data.code === 1) {
            this.$message({
              type: 'success',
              message: 'Delete Success!'
            })
            this.getList()
          }
        }).catch(e => {
          this.$alert(e)
          console.log(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancled.'
        })
      })
    },
    copyData(temp, row) {
      temp.id = row.id
      temp.bizType = row.bizType
      temp.bizDesc = row.bizDesc
      temp.mailTitleDateFormat = row.mailTitleDateFormat
      temp.mailTitle = row.mailTitle
      temp.scheduleTimeExpr = row.scheduleTimeExpr
      temp.templateName = row.templateName
      temp.isValid = row.isValid
    }
  }
}
</script>
