<template>
  <div class="level">
    <el-table
        :data="accountData"
        highlight-current-row
        style="width: 100%;margin-top: 40px;"
        empty-text="对不起，您没有权限查看用户账号信息">
        <el-table-column
            fixed
            prop="id"
            label="账号"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="accountType"
            label="账号类型"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="账号名"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别">
        </el-table-column>
        <el-table-column
            prop="birthday"
            label="生日"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="job"
            label="工作"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="level"
            label="权限">
        </el-table-column>
        <el-table-column
            prop="joinday"
            label="何时进入公司？"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="area"
            label="来自哪里？"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="habit"
            label="爱好"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话号"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="weixin"
            label="微信号"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="qq"
            label="qq号"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="email"
            label="邮箱"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="150px">
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
      getpersonlistUrl: ip + '/manager/getpersonlist',
      modifypersonUrl: ip + '/manager/modifyperson',
      deletepersonUrl: ip + '/manager/deleteperson',
      addpersonUrl: ip + '/manager/addperson',
      accountData: [],
      options: [{
        value: '管理员',
        label: '管理员'
      }, {
        value: '普通用户',
        label: '普通用户'
      }],
      columuWidth: '126px',
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
      vm.accountData = []
      vm.$http.post(this.getpersonlistUrl, {'userid': sessionStorage.getItem('userId')})
              .then((response) => {
                if (response.body.success) {
                  var list = response.body.personlist
                  list.forEach(function (element) {
                    var data = {
                      id: element.userid,
                      userName: element.username,
                      accountType: element.level === 0 ? '管理员' : '普通用户',
                      sex: element.sex === '1' ? '男' : '女',
                      birthday: element.birthday.slice(0, 10),
                      job: element.job,
                      level: element.level,
                      joinday: element.joinday.slice(0, 10),
                      area: element.area,
                      habit: element.habit,
                      phone: element.phone,
                      weixin: element.weixin,
                      qq: element.qq,
                      email: element.email
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
      // console.log(index)
      // console.log('------------')
      // console.log(row)
      this.$confirm('删除后该账号用户将无法再登录系统，确定要删除么？', '删除账号提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var vm = this
        vm.$http.post(this.deletepersonUrl, {'userid': sessionStorage.getItem('userId'), 'deleteuserid': row.id})
              .then((response) => {
                if (response.body.success) {
                  this.load()
                } else {
                  this.$alert(response.body.msg, '账号信息删除失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '账号信息删除失败1', {
                  confirmButtonText: '确定'
                })
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
          this.modifyperson()
          this.dialogFormVisible = false
        }
      })
    },
    submitaddForm (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.addperson()
          this.addDialogFormVisible = false
        }
      })
    },
    modifyperson () {
      var vm = this
      // req={userid:   changeuserid:   username:   level}
      var at = vm.form.accountType === '管理员' ? 0 : 1
      vm.$http.post(this.modifypersonUrl, {'userid': sessionStorage.getItem('userId'), 'changeuserid': vm.form.userId, 'username': vm.form.userName, 'level': at})
            .then((response) => {
              if (response.body.success) {
                this.load()
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
    },
    addperson () {
      var vm = this
      // req={userid: adduserid:  addpasswd: addusername:    addlevel: }
      vm.$http.post(this.addpersonUrl, {'userid': sessionStorage.getItem('userId'), 'adduserid': vm.addForm.userId, 'addpasswd': vm.addForm.passwd, 'addusername': vm.addForm.userName, 'addlevel': vm.addForm.accountType === '管理员' ? 0 : 1})
              .then((response) => {
                if (response.body.success) {
                  this.load()
                } else {
                  this.$alert(response.body.msg, '账号信息增加失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '账号信息增加失败1', {
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
    margin: 65px auto 0 auto !important;
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
