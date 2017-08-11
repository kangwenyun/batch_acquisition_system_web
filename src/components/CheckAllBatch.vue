<template>
  <div class="checkbatch">
    <div class="batch_header">全部批次信息查看</div>
    <div class="line"></div>
    <div class="content_table">
      <el-table
        :data="batchData"
        style="width: 100%"
        stripe
        highlight-current-row
        @row-click = "rowClick"
        @cell-mouse-enter = "popEnter"
        empty-text = "还没有当前阶段的批次信息哦~~~">
        <el-table-column type="expand">
          <template scope="props">
            <el-tree :data="props.row.detailData" 
                    :props="props.row.defaultProps" 
                    empty-text="还没有数据哦~~~"
                    highlight-current
                    style="border: 0;background: transparent"></el-tree>
          </template>
        </el-table-column>
        <el-table-column
            label="批次ID"
            prop="id">
            <template scope="scope">
              <el-popover 
                trigger="hover" 
                placement="right-end"
                :title="trayMsg">
                <el-table :data="popData" v-show="popDataToShow">
                  <el-table-column prop="num" label="序号"></el-table-column>
                  <el-table-column prop="type" width="150" label="类型"></el-table-column>
                  <el-table-column prop="time" width="200" label="录入时间"></el-table-column>
                  <el-table-column prop="flag" label="备注"></el-table-column>
                </el-table>
                <div slot="reference">
                  <p>{{ scope.row.id }}</p>
                </div>
              </el-popover>
            </template>
        </el-table-column>
        <el-table-column
            label="货物总数"
            prop="totalNum">
        </el-table-column>
        <el-table-column
            label="批次已有数"
            prop="alreadyNum">
        </el-table-column>
      </el-table>
    </div>
</div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'checkallbatch',
  data () {
    return {
      getAllBatchUrl: ip + '/batch/getallBatch',
      getBatchDetialThroughBatchidUrl: ip + '/batch/getBatchDetialThroughBatchid',
      batchData: [],
      trayMsg: '',
      popDataToShow: false,
      popData: []
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      var vm = this
      vm.$http.get(this.getAllBatchUrl)
              .then((response) => {
                if (response.body.success) {
                  var unaccept = response.body.unaccept // 未接受的批次
                  unaccept.forEach(function (element) {
                    var data = {
                      id: element.batchid,
                      totalNum: element.batchsum,
                      alreadyNum: element.batchcurrentamount,
                      detailData: [{
                        label: element.batchid + '-批次货物总数：' + element.batchsum + ';批次货物已有数：' + element.batchcurrentamount,
                        children: []
                      }],
                      defaultProps: {
                        children: 'children',
                        label: 'label'
                      }
                    }
                    this.push(data)
                  }, this.batchData)
                  var accept = response.body.accept // 接受的批次
                  accept.forEach(function (element) {
                    var data = {
                      id: element.batchid,
                      totalNum: element.batchsum,
                      alreadyNum: element.batchcurrentamount,
                      detailData: [{
                        label: element.batchid + '-批次货物总数：' + element.batchsum + ';批次货物已有数：' + element.batchcurrentamount,
                        children: []
                      }],
                      defaultProps: {
                        children: 'children',
                        label: 'label'
                      }
                    }
                    this.push(data)
                  }, this.batchData)
                  var check = response.body.check // 审核中的批次
                  check.forEach(function (element) {
                    var data = {
                      id: element.batchid,
                      totalNum: element.batchsum,
                      alreadyNum: element.batchcurrentamount,
                      detailData: [{
                        label: element.batchid + '-批次货物总数：' + element.batchsum + ';批次货物已有数：' + element.batchcurrentamount,
                        children: []
                      }],
                      defaultProps: {
                        children: 'children',
                        label: 'label'
                      }
                    }
                    this.push(data)
                  }, this.batchData)
                  var finish = response.body.finish // 已完成的批次
                  finish.forEach(function (element) {
                    var data = {
                      id: element.batchid,
                      totalNum: element.batchsum,
                      alreadyNum: element.batchcurrentamount,
                      detailData: [{
                        label: element.batchid + '-批次货物总数：' + element.batchsum + ';批次货物已有数：' + element.batchcurrentamount,
                        children: []
                      }],
                      defaultProps: {
                        children: 'children',
                        label: 'label'
                      }
                    }
                    this.push(data)
                  }, this.batchData)
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
    rowClick (row) {
      var vm = this
      vm.$http.post(this.getBatchDetialThroughBatchidUrl, {'batchid': row.id})
              .then((response) => {
                if (response.body.success) {
                  if (row.detailData[0].children.length === 0) {
                    var trayNum = response.body.list.length
                    response.body.list.forEach(function (element) {
                      var data = {
                        label: element[0].tray + '-托盘总数：' + trayNum + '；此托盘货物总数：' + element.length,
                        children: []
                      }
                      element.forEach(function (ele) {
                        data.label = ele.tray + '-托盘总数：' + trayNum + '；此托盘货物总数：' + element.length
                        this.push({label: ele.number + '-类型：' + ele.type_length + '*' + ele.type_width + '*' + ele.type_high + '；录入时间：' + ele.time + '；备注：' + ele.flag})
                      }, data.children)
                      this.push(data)
                    }, row.detailData[0].children)
                  }
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
    popEnter (row) {
      var vm = this
      vm.popData = []
      vm.$http.post(this.getBatchDetialThroughBatchidUrl, {'batchid': row.id})
              .then((response) => {
                if (response.body.success) {
                  var trayNum = response.body.list.length
                  if (trayNum === 0) {
                    this.trayMsg = '当前批次货物已有数为0'
                    this.popDataToShow = false
                  }
                  response.body.list.forEach(function (element) {
                    vm.trayMsg = element[0].tray + '-托盘总数：' + trayNum + '；此托盘货物总数：' + element.length
                    element.forEach(function (ele) {
                      var val = {
                        num: ele.number,
                        type: ele.type_length + '*' + ele.type_width + '*' + ele.type_high,
                        time: ele.time,
                        flag: ele.flag
                      }
                      vm.popData.push(val)
                      vm.popDataToShow = true
                    })
                  })
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.checkbatch{
  margin-top: 75px;
}
.content_table{
  margin-bottom: 50px;
  border-top: 1px solid #c0cdd9;
}
.batch_header{
    border-left: 3px solid #59AfE4;
    padding-left: 5px;
    font-size: larger;
    text-align: -webkit-left;
}
.line{
  height: 1px;
  background-color: #c0cdd9;
  margin: 10px 0;
}
.content_tree{
  margin-top:40px;
}
.footer{
    margin-left: -600px;
    width: 1200px;
}
.tree{
    border: 0 !important;
    background: transparent !important;
}
</style>
