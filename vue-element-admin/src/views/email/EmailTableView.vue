<template>
  <div>
    <report-list :biz-type="bizType"/>
    <email-html :biz-type="bizType"/>
    <email-recipientes :biz-type="bizType"/>
  </div>
</template>

<script>
import ReportList from './components/ReportList'
import EmailHtml from './components/EmailHtml'
import EmailRecipientes from './components/EmailRecipients'

export default {
  name: 'EmailTablelView',
  components: {
    ReportList,
    EmailHtml,
    EmailRecipientes
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

