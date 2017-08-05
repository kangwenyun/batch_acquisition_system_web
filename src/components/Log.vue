<template>
  <div class="log">
    <el-row class="content_wrap">
      <div class="date_wrap">
        <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            class="log_date"
            @change="dateChange">
        </el-date-picker>
      </div>
      <el-table
        :data="logData"
        style="width: 100%;margin-top: 5px;">
        <el-table-column
            prop="time"
            label="时间"
            width="200">
        </el-table-column>
        <el-table-column
            prop="id"
            label="账号"
            width="150">
        </el-table-column>
        <el-table-column
            prop="operate"
            label="操作">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'log',
  data () {
    return {
      logUrl: ip + '/user/log',
      date: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      logData: []
    }
  },
  created () {
    var d = new Date()
    var month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1
    var dd = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()
    var date = d.getFullYear() + '-' + month + '-' + dd
    this.date = date
    this.load(date)
  },
  methods: {
    load (date) {
      this.logData = []
      var vm = this
      vm.$http.post(this.logUrl, {'date': '-' + date})
              .then((response) => {
                if (response.body.success) {
                  var logData = response.body.log
                  logData.forEach(function (element) {
                    if (element) {
                      var data = element.split('|')
                      var dataLog = {
                        time: data[0].slice(1, 20),
                        id: data[1],
                        operate: data[2]
                      }
                      this.push(dataLog)
                    }
                  }, this.logData)
                } else {
                  this.$message({
                    message: response.body.msg,
                    type: 'error'
                  })
                }
              }, (response) => {
                this.$message({
                  message: response.body.msg,
                  type: 'error'
                })
              })
    },
    dateChange (date) {
      this.load(date)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.log{
  margin-top: 70px;
}
.content_wrap{
    margin: 32px auto 0 auto !important;
    padding: 0 24px;
    padding-bottom: 50px;
}
.date_wrap{
    position: relative;
}
.log_date{
    width: 258px !important;
}
</style>
