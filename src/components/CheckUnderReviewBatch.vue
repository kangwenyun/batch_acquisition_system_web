<template>
  <div class="checkbatch">
    <div class="batch_header">审核中批次信息查看</div>
    <div class="line"></div>
    <div class="content_table">
      <el-table
        :data="batchData"
        style="width: 100%"
        stripe
        highlight-current-row
        @row-click = "rowClick"
        empty-text = "还没有当前阶段的批次信息哦~~~">
        <el-table-column type="expand">
          <template scope="props">
            <el-tree :data="props.row.detailData" 
                    :props="props.row.defaultProps" 
                    empty-text="还没有数据哦~~~"
                    @node-click="handleNodeClick"
                    highlight-current
                    style="border: 0;background: transparent"></el-tree>
          </template>
        </el-table-column>
        <el-table-column
            label="批次ID"
            prop="id">
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
  name: 'checkunderreviewbatch',
  data () {
    return {
      getAllBatchUrl: ip + '/batch/getallBatch',
      getBatchDetialThroughBatchidUrl: ip + '/batch/getBatchDetialThroughBatchid',
      batchData: []
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
                        label: element.tray + '-托盘总数：' + trayNum + '；此托盘货物总数：' + element.length,
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
    handleNodeClick (data) {
      // console.log(data)
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
