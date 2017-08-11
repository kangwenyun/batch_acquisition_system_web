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
        <el-select v-model="value" placeholder="请选择" v-show="userselect">
          <el-option
            v-for="item in users"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
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
      checkpermissionUrl: ip + '/user/checkpermission',
      logUrl: ip + '/user/log',
      getuserslistUrl: ip + '/user/getuserslist',
      id: sessionStorage.getItem('userId'),
      date: new Date(),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      userselect: false,
      users: [],
      value: 'All',
      logData: []
    }
  },
  created () {
    this.userselectShow()
    this.load()
    this.getuserslist()
  },
  methods: {
    userselectShow () {
      var vm = this
      vm.$http.post(this.checkpermissionUrl, {'userid': this.id})
              .then((response) => {
                if (response.body.success) {
                  this.userselect = true
                } else {
                  this.userselect = false
                }
              }, (response) => {
                this.userselect = false
              })
    },
    load () {
      var vm = this
      var month = this.date.getMonth() + 1 < 10 ? '0' + (this.date.getMonth() + 1) : this.date.getMonth() + 1
      var dd = this.date.getDate() < 10 ? '0' + this.date.getDate() : this.date.getDate()
      var date = this.date.getFullYear() + '-' + month + '-' + dd
      this.logData = []
      vm.$http.post(this.logUrl, {'id': vm.id, 'userlist': this.value, 'date': '-' + date})
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
    getuserslist () {
      this.users = [{
        value: 'All',
        label: 'All'
      }]
      var vm = this
      vm.$http.get(this.getuserslistUrl)
              .then((response) => {
                if (response.body.success) {
                  var list = response.body.userslist
                  list.forEach(function (element) {
                    var user = {
                      value: element,
                      label: element
                    }
                    this.users.push(user)
                  }, this)
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
  },
  watch: {
    date: 'load',
    value: 'load'
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
