<template>
  <div class="level">
    <el-table
        :data="accountData"
        highlight-current-row
        style="width: 100%;margin-top: 40px;"
        empty-text="对不起，您没有权限查看用户账号信息">
        <el-table-column
            prop="id"
            label="账号">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="账号名">
        </el-table-column>
        <el-table-column
            prop="accountType"
            label="账号类型">
        </el-table-column>
        <el-table-column
            label="操作">
            <template scope="scope">
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">修改</el-button>
                <el-button @click="delet(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="add()" type="text" size="small">添加</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="账号修改" v-model="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="账号名" :label-width="formLabelWidth" prop = "userName">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="账号类型" :label-width="formLabelWidth">
                <el-select v-model="form.accountType" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="添加新用户" v-model="addDialogFormVisible">
        <el-form ref="addForm" :model="addForm" :rules="addRules">
            <el-form-item label="账号" :label-width="formLabelWidth" prop = "userId">
                <el-input v-model="addForm.userId"></el-input>
            </el-form-item>
            <el-form-item label="账号名" :label-width="formLabelWidth" prop = "userName">
                <el-input v-model="addForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="初始密码" :label-width="formLabelWidth" prop = "passwd">
                <el-input v-model="addForm.passwd"></el-input>
            </el-form-item>
            <el-form-item label="账号类型" :label-width="formLabelWidth" prop = "accountType">
                <el-select v-model="addForm.accountType" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitaddForm('addForm')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'level',
  data () {
    return {
      getpersonlistUrl: ip + '/user/getpersonlist',
      changepermissionUrl: ip + '/user/changepermission',
      accountData: [],
      options: [{
        value: '管理员',
        label: '管理员'
      }, {
        value: '普通用户',
        label: '普通用户'
      }],
      dialogFormVisible: false,
      addDialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        userId: '',
        userName: '',
        accountType: ''
      },
      rules: {
        userName: [
            {required: true, message: '请输入账号名'}
        ]
      },
      addForm: {
        userId: '',
        userName: '',
        passwd: '',
        accountType: ''
      },
      addRules: {
        userId: [
            {required: true, message: '请输入账号'}
        ],
        userName: [
            {required: true, message: '请输入账号名'}
        ],
        passwd: [
            {required: true, message: '请输入初始密码'}
        ],
        accountType: [
            {required: true, message: '请选择账号类型'}
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
      vm.$http.post(this.getpersonlistUrl, {'userid': sessionStorage.getItem('userId')})
              .then((response) => {
                if (response.body.success) {
                  var list = response.body.personlist
                  list.forEach(function (element) {
                    var data = {
                      id: element.userid,
                      userName: element.username,
                      accountType: element.accountType
                    }
                    this.push(data)
                  }, this.accountData)
                } else {
                  this.$alert(response.body.msg, '账号信息获取失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '账号信息获取失败1', {
                  confirmButtonText: '确定'
                })
              })
    },
    edit (index, row) {
    //   console.log(index)
    //   console.log('------------')
      // console.log(row)
      this.dialogFormVisible = true
      this.form.userId = row.id
      this.form.userName = row.userName
      this.form.accountType = row.accountType
    },
    delet (index, row) {
    //   console.log(index)
    //   console.log('------------')
      // console.log(row)
      this.$confirm('删除后该账号用户将无法再登录系统，确定要删除么？', '删除账号提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    add () {
      this.addDialogFormVisible = true
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.changeLevel()
          this.dialogFormVisible = false
        }
      })
    },
    submitaddForm (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.changeLevel()
          this.addDialogFormVisible = false
        }
      })
    },
    changeLevel () {
      var vm = this
      vm.$http.post(this.changepermissionUrl, {'userid': sessionStorage.getItem('userId'), 'changeuserid': vm.form.userName, 'level': vm.form.accountType})
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                } else {
                  this.$alert(response.body.msg, '账号信息修改失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '账号信息修改失败1', {
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
