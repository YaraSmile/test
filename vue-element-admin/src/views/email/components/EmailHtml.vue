<template>
  <div class="app-container">
    <div style="margin: 5px 5px 5px 5px;padding:20px 20px 20px 20px;border:1px solid #E4E7ED">
      <el-row>
        <el-col :span="12">
          <div class="grid-content" style="margin: 0 0 0 15px;">{{ $t('emailHtml.emailHtml') }}</div>
        </el-col>
        <el-col :span="12" align="middle">
          <div class="grid-content" align="right">
            <el-button type="primary">Add</el-button>
          </div>
        </el-col>
      </el-row>
      <el-table :data="list">
        <template slot-scope="scope">
          <el-form label-position="right" inline label-width="80px">
            <el-form-item :label="$t('emailHtml.header')">
              <el-input v-model="scope.row.header"></el-input>
            </el-form-item>
            <el-form-item :label="$t('emailHtml.tail')" prop="bizType">
              <template slot-scope="scope">
                <span>{{ scope.row.bizType }}</span>
              </template>
            </el-form-item>
            <el-form-item :label="$t('emailHtml.actions')" prop= "actions" align="center" width="330px" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEdit(scope.row)"/>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row)"/>
              </template>
            </el-form-item>
          </el-form>
        </template>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getResult_param } from '../../../api/email'

const GET_EMAILHTML_URL = '/webapi/schedulereport/biz/table/html'
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
      // list:''
    }
  },
  created() {
    this.getEmailHTML()
  },
  methods: {
    getEmailHTML() {
      getResult_param(GET_EMAILHTML_URL, this.bizType).then(res => {
        console.log(3333, res)
        if (res.data.code === 1) {
          res.data.data.forEach()
        }
      })
    }
  }
}
</script>
