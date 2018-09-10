<template>
  <div>
    <report-list :biz-type="bizType"/>
    <email-html :biz-type="bizType"/>
  </div>
</template>

<script>
import ReportList from './components/ReportList'
import EmailHtml from './components/EmailHtml'

export default {
  name: 'EmailDetail',
  components: {
    ReportList,
    EmailHtml
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

