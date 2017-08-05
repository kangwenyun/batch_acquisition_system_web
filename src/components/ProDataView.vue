<template>
  <div class="view"> 
    <el-row class="content">
      <div class="find">
        <el-button @click="addAll" style="width:24%">加载全部</el-button>
          <div class="find_input">
              <el-autocomplete
                  placeholder="请输入要查询信息"
                  icon="search"
                  v-model="search"
                  :fetch-suggestions="querySearch"
                  style="width:100%"
                  @select="handleSelect">
              </el-autocomplete>
          </div>
      </div>
      <el-table
        :data="proData"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column
            prop="batchId"
            label="批次号">
        </el-table-column>
        <el-table-column
            prop="trayId"
            label="托盘号">
        </el-table-column>
        <el-table-column
            prop="proId"
            label="货物号">
        </el-table-column>
        <el-table-column
            prop="number"
            label="批次序号">
        </el-table-column>
        <el-table-column label="货物类型">
          <el-table-column
            prop="type_length"
            label="长">
          </el-table-column>
          <el-table-column
            prop="type_width"
            label="宽">
          </el-table-column>
          <el-table-column
            prop="type_high"
            label="高">
          </el-table-column>
        </el-table-column>
        <el-table-column
            prop="time"
            label="录入时间"
            :width="width">
        </el-table-column>
        <el-table-column
            prop="flag"
            label="备注">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'view',
  data () {
    return {
      getproductlistUrl: ip + '/product/getproductlist',
      search: '',
      proData: [],
      findData: [],
      saveData: [],
      width: '200px'
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      var vm = this
      vm.$http.get(this.getproductlistUrl)
              .then((response) => {
                if (response.body.success) {
                  response.body.productlist.forEach(function (element) {
                    var data = {
                      id: element.productid,
                      batchId: element.batchid,
                      trayId: element.tray,
                      proId: element.productid,
                      number: element.number,
                      type_length: element.type_length,
                      type_width: element.type_width,
                      type_high: element.type_high,
                      time: element.time,
                      flag: element.flag
                    }
                    this.proData.push(data)
                    this.saveData.push(data)
                  }, this)
                  this.loadAll()
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
    tableRowClassName (row, index) {
      if (row.flag === 1) {
        // console.log('row:' + row + ';flag:' + row.flag)
        return 'info-row'
      }
      return ''
    },
    querySearch (queryString, cb) {
      var findData = this.findData
      var results = queryString ? findData.filter(this.createFilter(queryString)) : findData
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (pdata) => {
        return (pdata.value.indexOf(queryString) !== -1)
      }
    },
    loadAll () {
      var data = []
      this.proData.forEach(function (element) {
        var a = ' 批次号 - ' + element.batchId
        a += '; 托盘号 - ' + element.trayId + '; 货物号 - ' + element.proId
        a += '; 批次序号 - ' + element.number + '; 货物类型(长) - ' + element.type_length
        a += ';宽 - ' + element.type_width + ';高 - ' + element.type_high
        a += '; 录入时间 - ' + element.time + '; 备注 - ' + element.flag
        this.push({value: a})
      }, data)
      this.findData = data
    },
    handleSelect (item) {
      var value = item.value.split(';')
      this.proData = [{
        batchId: value[0].split(' - ')[1],
        trayId: value[1].split(' - ')[1],
        proId: value[2].split(' - ')[1],
        number: value[3].split(' - ')[1],
        type_length: value[4].split(' - ')[1],
        type_width: value[5].split(' - ')[1],
        type_high: value[6].split(' - ')[1],
        time: value[7].split(' - ')[1],
        flag: value[8].split(' - ')[1]
      }]
    },
    addAll () {
      this.proData = this.saveData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.view{
  margin-top: 70px;
}
.find_input{
  display: inline-block;
  width: 75%;
}
.find{
  margin-bottom: 5px;
  width: 100%;
}
.info-row {
    background-color: #b1b3b5;
    color: white;
}
.info-row:hover{
    color: black;
}
.content{
    margin-top: 16px;
}
.el-table th{
  background: #324157;
}
.el-table__header-wrapper thead div{
  background: #324157;
  color: white;
}
</style>
