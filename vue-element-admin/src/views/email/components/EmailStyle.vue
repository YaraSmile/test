<template>
  <div class="app-container">
    <div style="margin: 5px 5px 5px 5px;padding:20px 10px 10px 20px;border:1px solid #E4E7ED">
      <el-row>
        <el-col :span="12">
          <div style="margin: 0 0 20px 15px;">{{ $t('emailRecipients.emailRecipients') }}</div>
        </el-col>
        <el-col :span="12">
          <div style="margin-right:15px;margin-bottom:15px;" align="right">
            <el-button type="primary" icon="el-icon-plus" @click="handleCreate()">{{ $t('emailRecipients.add') }}</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="list" border highlight-current-row="">
        <el-table-column :label="$t('emailRecipients.id')" width="60px">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('emailRecipients.mail')">
          <template slot-scope="scope">
            <span>{{ scope.row.mail }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('emailRecipients.runtimeType')">
          <template slot-scope="scope">
            <span>{{ scope.row.runtimeType }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('emailRecipients.mailOrder')">
          <template slot-scope="scope">
            <span>{{ scope.row.mailOrder }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('emailRecipients.actions')" prop= "actions" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button class="actionButton" type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
            <el-button class="actionButton" type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="right" label-width="25%" style="width: 80%; margin-left:20px;">
          <el-form-item :label="$t('emailRecipients.mail')" prop="mail">
            <el-input v-model="temp.mail"/>
          </el-form-item>
          <el-form-item :label="$t('emailRecipients.mailOrder')">
            <el-input v-model="temp.mailOrder"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{ $t('email.cancel') }}</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="updateData">{{ $t('email.confirm') }}</el-button>
          <el-button v-else type="primary" @click="updateData">{{ $t('email.confirm') }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { getResult_param, deleteData, postData } from '../../../api/email'

// const env = 'test'
// const GET_RECIP_URL = '/webapi/schedulereport/biz'
// const DELETE_RECIP_URL = '/webapi/schedulereport/biz/mail'
// const POST_RECIP_URL = '/webapi/schedulereport/biz/mail'

export default {
  name: 'EmailStyle',
  props: {
    bizType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: null,
      loading: false,
      temp: {
        bizType: this.bizType,
        mail: '',
        mailOrder: '',
        runtimeType: env
      },
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogFormVisible: false,
      dialogStatus: 'update',
      rules: {
        mail: [{ required: true, message: 'Please input Email', type: 'email', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getRecipients()
  },
  // methods: {
  //   getRecipients() {
  //     this.loading = true
  //     getResult_param(`${GET_RECIP_URL}/${this.bizType}/env`, env).then(res => {
  //       this.loading = false
  //       if (res.data.code === 1) {
  //         console.log(5555, res)
  //         this.list = res.data.data
  //       } else {
  //         this.$notify({
  //           title: '失败',
  //           message: res.data.msg,
  //           type: 'fail',
  //           duration: 2000
  //         })
  //       }
  //     }).catch(err => {
  //       this.loading = false
  //       this.$alert(err)
  //     })
  //   },
  //   handleCreate() {
  //     this.dialogFormVisible = true
  //     this.temp = {}
  //     this.temp.runtimeType = env
  //     this.temp.bizType = this.bizType
  //     this.$nextTick(() => {
  //       this.$refs['dataForm'].clearValidate()
  //     })
  //   },
  //   handleEdit(row) {
  //     this.dialogFormVisible = true
  //     this.temp = Object.assign({}, row)
  //   },
  //   updateData() {
  //     this.$refs['dataForm'].validate(valid => {
  //       if (valid) {
  //         postData(POST_RECIP_URL, this.temp).then(res => {
  //           console.log(res)
  //           if (res.data.code === 1) {
  //             this.dialogFormVisible = false
  //             this.$notify({
  //               title: '成功',
  //               message: '提交成功',
  //               type: 'success',
  //               duration: 2000
  //             })
  //           } else {
  //             this.$notify({
  //               title: '失败',
  //               message: res.data.msg,
  //               type: 'fail',
  //               duration: 2000
  //             })
  //           }
  //           this.getRecipients()
  //         }).catch(err => {
  //           this.$alert(err)
  //         })
  //       }
  //     })
  //   },
  //   handleDelete(row) {
  //     deleteData(DELETE_RECIP_URL, row.id).then(res => {
  //       if (res.data.code === 1) {
  //         this.$notify({
  //           title: '成功',
  //           message: '删除成功',
  //           type: 'success',
  //           duration: 2000
  //         })
  //         this.getRecipients()
  //       } else {
  //         this.$notify({
  //           title: '失败',
  //           message: res.data.msg,
  //           type: 'fail',
  //           duration: 2000
  //         })
  //       }
  //     }).catch(err => {
  //       this.$alert(err)
  //       console.log(err)
  //     })
  //   }
  // }
}
</script>
