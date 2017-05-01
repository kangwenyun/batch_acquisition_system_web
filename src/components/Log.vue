<template>
  <div class="log">
    <el-row class="content_wrap">
      <div class="date_wrap">
        <el-date-picker
            v-model="date"
            type="date"
            placeholder="选择日期"
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
            width="100">
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
// var ipValue = require('../glbl.js')
// var ip = ipValue.ip.value
export default {
  name: 'log',
  data () {
    return {
      date: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      logData: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      var data = [{
        time: '2017-04-14 10:01:19',
        id: 'admin',
        operate: '账号已经存在'
      }, {
        time: '2017-04-14 10:01:20',
        id: 'user',
        operate: '批次号已经存在无法添加'
      }, {
        time: '2017-04-14 10:01:20',
        id: 'admin',
        operate: '添加新货物'
      }]
      data.forEach(function (element) {
        this.push(element)
      }, this.logData)
    },
    dateChange (e) {
      console.log(e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
