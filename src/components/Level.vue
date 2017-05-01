<template>
  <div class="level">
    <el-table
        :data="levelData"
        highlight-current-row
        style="width: 100%;margin-top: 40px;"
        empty-text="对不起，您没有权限查看权限信息">
        <el-table-column
            prop="id"
            label="账号">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="账号名">
        </el-table-column>
        <el-table-column
            prop="level"
            label="权限等级">
        </el-table-column>
        <el-table-column
            label="操作">
            <template scope="scope">
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="权限修改" v-model="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="原权限" :label-width="formLabelWidth">
                <el-input v-model="form.oldLevel" disabled></el-input>
            </el-form-item>
            <el-form-item label="新权限" :label-width="formLabelWidth" prop = "newLevel">
                <el-input v-model.number="form.newLevel"> </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
  name: 'level',
  data () {
    // var ip = 'http://192.168.1.122:3000/v1'
    var ip = 'http://192.168.137.1:3000/v1'
    return {
      changeLevelUrl: ip + '/user/getpersonlist',
      levelData: [],
      dialogFormVisible: false,
      formLabelWidth: '70px',
      form: {
        oldLevel: '',
        newLevel: ''
      },
      rules: {
        newLevel: [
            {required: true, message: '请输入新权限'},
            {type: 'number', message: '权限值必须为数字值'}
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
      vm.$http.post(this.changeLevelUrl, {'userid': sessionStorage.getItem('userId')})
              .then((response) => {
                if (response.body.success) {
                  var list = response.body.personlist
                  list.forEach(function (element) {
                    var data = {
                      id: element.userid,
                      userName: element.username,
                      level: element.level
                    }
                    this.push(data)
                  }, this.levelData)
                } else {
                  this.$alert(response.body.msg, '权限信息获取失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '权限信息获取失败1', {
                  confirmButtonText: '确定'
                })
              })
    },
    edit (index, row) {
    //   console.log(index)
    //   console.log('------------')
    //   console.log(row)
      this.dialogFormVisible = true
      this.form.oldLevel = row.level
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.changeLevel()
          this.dialogFormVisible = false
        }
      })
    },
    changeLevel () {
      var vm = this
      vm.$http.post(this.changeLevelUrl, {'userid': vm.form.user, 'newlevel': vm.form.newLevel})
              .then((response) => {
                if (response.success) {
                  this.$message({
                    message: response.msg,
                    type: 'success'
                  })
                } else {
                  this.$alert(response.msg, '权限修改失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.msg, '权限修改失败', {
                  confirmButtonText: '确定'
                })
              })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.level{
    max-width: 960px;
    min-width: 372px;
    margin: 32px auto 0 auto !important;
    padding: 0 24px;
    padding-bottom: 50px;
}
.el-button:hover{
    background-color: transparent !important;
    color: #69b946 !important;
    border-color: transparent !important;
}
</style>
<style>
.el-dialog--small {
    width: 400px;
}
</style>
