<template>
  <div>
    <excel-report-list :biz-type="bizType"/>
    <email-recipients :biz-type="bizType"/>
  </div>
</template>

<script>

import ExcelReportList from './components/ExcelReportList'
import EmailRecipients from './components/EmailRecipients'
export default {
  name: 'EmailExcelView',
  components: {
    EmailRecipients,
    ExcelReportList
  },
  data() {
    return {
      bizType: ''
    }
  },
  created() {
    this.bizType = this.$route.query.bizType
  }
}
</script>
