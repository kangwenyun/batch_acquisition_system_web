<template>
  <div class="proLine">
        <div class="content_wrap">
            <el-tree
                :data="batchData"
                :props="defaultProps"
                highlight-current
                default-expand-all
                accordion
                :expand-on-click-node="false"
                node-key="id"
                @node-click="handleNodeClick">
            </el-tree>
            <i class="el-icon-plus addBatch" @click="dialogFormVisible = true"></i>
            <el-dialog title="增加批次" v-model="dialogFormVisible">
              <el-form ref="form" :model="form" :rules="rules">
                  <el-form-item label="批次ID" :label-width="formLabelWidth" prop = "label">
                      <el-input v-model="form.label"></el-input>
                  </el-form-item>
                  <el-form-item label="货物总数" :label-width="formLabelWidth" prop = "totalNum">
                      <el-input v-model.number="form.totalNum"> </el-input>
                  </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitForm('form')">确 定</el-button>
              </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'proLine',
  data () {
    return {
      getAllBatchUrl: ip + '/batch/getallBatch',
      addBatchUrl: ip + '/batch/addbatch',
      unaccepttoacceptBatchUrl: ip + '/batch/unaccepttoacceptBatch',
      accepttocheckBatchUrl: ip + '/accepttocheckBatch',
      batchData: [{
        id: 1,
        label: '未接受的批次',
        children: []
      }, {
        id: 2,
        label: '接受的批次',
        children: []
      }, {
        id: 3,
        label: '审核中的批次',
        children: []
      }, {
        id: 4,
        label: '完成的批次',
        children: []
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        label: '',
        totalNum: ''
      },
      rules: {
        label: [
          {required: true, message: '请输入批次ID'}
        ],
        totalNum: [
          {required: true, message: '请输入货物总数'},
          {type: 'number', message: '数量必须为数字值'}
        ]
      }
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
                      'id': element.id,
                      'label': element.batchid,
                      'children': [
                        { 'label': '创建时间:' + element.createtime },
                        { 'label': '批次总数:' + element.batchsum },
                        { 'label': '批次已有数:' + element.batchcurrentamount }
                      ]
                    }
                    this.push(data)
                  }, this.batchData[0].children)
                  var accept = response.body.accept // 接受的批次
                  accept.forEach(function (element) {
                    var data = {
                      'id': element.id,
                      'label': element.batchid,
                      'children': [
                        { 'label': '创建时间:' + element.createtime },
                        { 'label': '批次总数:' + element.batchsum },
                        { 'label': '批次已有数:' + element.batchcurrentamount }
                      ]
                    }
                    this.push(data)
                  }, this.batchData[1].children)
                  var check = response.body.check // 审核中的批次
                  check.forEach(function (element) {
                    var data = {
                      'id': element.id,
                      'label': element.batchid,
                      'children': [
                        { 'label': '创建时间:' + element.createtime },
                        { 'label': '批次总数:' + element.batchsum },
                        { 'label': '批次已有数:' + element.batchcurrentamount }
                      ]
                    }
                    this.push(data)
                  }, this.batchData[2].children)
                  var finish = response.body.finish // 已完成的批次
                  finish.forEach(function (element) {
                    var data = {
                      'id': element.id,
                      'label': element.batchid,
                      'children': [
                        { 'label': '创建时间:' + element.createtime },
                        { 'label': '批次总数:' + element.batchsum },
                        { 'label': '批次已有数:' + element.batchcurrentamount }
                      ]
                    }
                    this.push(data)
                  }, this.batchData[3].children)
                } else {
                  this.$alert(response.body.msg, '增加批次失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '增加批次失败1', {
                  confirmButtonText: '确定'
                })
              })
    },
    handleNodeClick (data, node) {
      var vm = this
      // console.log(data) // data.id当前id
      // console.log('-----')
      // console.log(node)
        //   console.log("------");
        //   console.log(this);
      switch (node.parent.id) {
        case 1:
          this.$confirm('确定接受该批订单么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            vm.$http.post(this.unaccepttoacceptBatchUrl, {'batchid': data.label})
              .then((response) => {
                if (response.body.success) {
                  for (var i = 0; i < this.batchData[0].children.length; i++) {
                    if (this.batchData[0].children[i].label === data.label) {
                      this.batchData[0].children.splice(i, 1)
                    }
                  }
                  this.batchData[1].children.push({id: data.id, label: data.label})
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
          }).catch(() => {
          })
          break
        case 2:
          this.$confirm('确定提交该批订单么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            vm.$http.post(this.accepttocheckBatchUrl, {'batchid': data.label})
              .then((response) => {
                if (response.body.success) {
                  for (var i = 0; i < this.batchData[0].children.length; i++) {
                    if (this.batchData[1].children[i].label === data.label) {
                      this.batchData[1].children.splice(i, 1)
                    }
                  }
                  this.batchData[2].children.push({id: data.id, label: data.label})
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
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消提交'
            })
          })
          break
        default:
          break
      }
    },
    changeStatus (url, id) {
      var vm = this
      vm.$http.post(url, {'batchid': id})
              .then((response) => {
                if (response.success) {
                  this.$message({
                    message: response.msg,
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: response.msg,
                    type: 'error'
                  })
                }
              }, (response) => {
                this.$message({
                  message: response.msg,
                  type: 'error'
                })
              })
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          var j = Number(this.batchData[0].children.length)
          this.batchData[0].children.push({id: j, label: this.form.label})
          this.form.label = ''
          this.form.totalNum = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // console.log('label:' + this.form.label)
      // console.log('totalNum:' + this.form.totalNum)
      this.dialogFormVisible = false
    },
    addBatch () {
      var vm = this
      vm.$http.post(this.addBatchUrl, {'batchid': vm.form.label, 'batchsum': vm.form.totalNum})
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                } else {
                  this.$alert(response.body.msg, '增加批次失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '增加批次失败', {
                  confirmButtonText: '确定'
                })
              })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.proLine{
    position: relative;
    width: 500px;
    margin: 0 auto;
}
.addBatch{
    height: 30px !important;
    line-height: 30px;
    position: absolute;
    top: 3px;
    right: 35px;
}
.content_wrap{
    max-width: 960px;
    min-width: 372px;
    margin: 32px auto 0 auto !important;
    padding: 0 24px;
    padding-bottom: 50px;
}
</style>
