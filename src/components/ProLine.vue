<template>
  <div class="proLine">
        <div class="content_wrap">
            <el-tree
                :data="batchData"
                :props="defaultProps"
                highlight-current
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
export default {
  name: 'proLine',
  data () {
    return {
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
      var data = [{
        id: 0,
        label: 'A1'
      }, {
        id: 1,
        label: 'A2'
      }, {
        id: 2,
        label: 'A3'
      }, {
        id: 3,
        label: 'A4'
      }]
      data.forEach(function (element) {
        this.push(element)
      }, this.batchData[0].children)
    },
    handleNodeClick (data, node) {
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
            this.batchData[0].children.splice(data.id, 1)
            this.batchData[1].children.push({id: data.id, label: data.label})
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消接受'
            })
          })
          break
        case 2:
          this.$confirm('确定提交该批订单么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.batchData[1].children.splice(data.id, 1)
            this.batchData[2].children.push({id: data.id, label: data.label})
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.proLine{
    position: relative;
    width: 500px;
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
