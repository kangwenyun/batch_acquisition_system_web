<template>
  <div class="review">
    <el-table
        :data="registerPersonList"
        highlight-current-row
        style="width: 100%;margin-top: 40px;"
        empty-text="暂时还没有新注册的账户">
        <el-table-column
            fixed
            prop="changeuserid"
            label="账号"
            :width="columuWidth">
        </el-table-column>
        <el-table-column
            prop="nickname"
            label="昵称"
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
            width="180px">
            <template scope="scope">
                <el-button @click="addLevel(scope.$index, scope.row)" type="text" size="small" class="operate">添加权限</el-button>
                <el-button @click="pass(scope.$index, scope.row)" type="text" size="small" class="operate">通过</el-button>
                <el-button @click="notPass(scope.$index, scope.row)" type="text" size="small" class="operate">未通过</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="权限添加" v-model="dialogFormVisible">
        <el-form ref="addForm" :model="addForm" :rules="rules">
            <el-form-item label="登录账号" :label-width="formLabelWidth" prop = "changeuserid">
                <el-input v-model.number="addForm.changeuserid" disabled> </el-input>
            </el-form-item>
            <el-form-item label="权限" :label-width="formLabelWidth" prop = "level">
                <el-input v-model.number="addForm.level"> </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'review',
  data () {
    return {
      checkuserlistUrl: ip + '/user/checkuserlist',
      addLevelUrl: ip + '/user/checkuser',
      checkusertouserUrl: ip + '/user/checkusertouser',
      refusecheckUrl: ip + '/user/refusecheck',
      registerPersonList: [],
      dialogFormVisible: false,
      formLabelWidth: '70px',
      columuWidth: '126px',
      id: sessionStorage.getItem('userId'),
      changeuserid: '',
      nickname: '',
      sex: '',
      birthday: '',
      job: '',
      level: '',
      joinday: '',
      area: '',
      habit: '',
      phone: '',
      weixin: '',
      qq: '',
      email: '',
      addForm: {
        changeuserid: '',
        level: ''
      },
      rules: {
        level: [
            {required: true, message: '请输入权限值'},
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
      this.registerPersonList = []
      var vm = this
      vm.$http.post(this.checkuserlistUrl, {'userid': vm.id})
              .then((response) => {
                if (response.body.success) {
                  var list = response.body.personlist
                  list.forEach(function (element) {
                    var data = {
                      changeuserid: element.userid,
                      nickname: element.username,
                      sex: element.sex,
                      birthday: element.birthday,
                      job: element.job,
                      level: element.level,
                      joinday: element.joinday,
                      area: element.area,
                      habit: element.habit,
                      phone: element.phone,
                      weixin: element.weixin,
                      qq: element.qq,
                      email: element.email
                    }
                    this.push(data)
                  }, this.registerPersonList)
                } else {
                  this.$alert(response.body.msg, '新注册信息获取失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '新注册信息获取失败1', {
                  confirmButtonText: '确定'
                })
              })
    },
    checkpermission () {
      var vm = this
      vm.$http.post(this.checkusertouserUrl, {'userid': vm.id, 'changeuserid': vm.changeuserid})
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                }
              }, (response) => {
                this.$message({
                  message: response.body.msg,
                  type: 'success'
                })
              })
    },
    addLevel (index, row) {
      // console.log(row)
      this.addForm.changeuserid = row.changeuserid
      this.dialogFormVisible = true
    },
    pass (index, row) {
      // var level = row.userId
      // console.log(row)
      var vm = this
      vm.$http.post(this.checkusertouserUrl, {'userid': vm.id, 'changeuserid': row.changeuserid})
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                } else {
                  this.$alert(response.body.msg, '通过失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '通过失败1', {
                  confirmButtonText: '确定'
                })
              })
    },
    notPass (index, row) {
    // var level = row.userId
      var vm = this
      vm.$http.post(this.refusecheckUrl, {'userid': vm.id, 'changeuserid': row.changeuserid, 'email': row.email})
              .then((response) => {
                if (response.body.success) {
                  this.registerPersonList.splice(index, 1)
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                } else {
                  this.$alert(response.body.msg, '未通过失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '未通过失败', {
                  confirmButtonText: '确定'
                })
              })
    },
    submitForm (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.checkuser()
          this.dialogFormVisible = false
        }
      })
    },
    checkuser () {
      var vm = this
      vm.$http.post(this.addLevelUrl, {'userid': vm.id, 'changeuserid': this.addForm.changeuserid, 'level': this.addForm.level})
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                  this.load()
                } else {
                  this.$alert(response.body.msg, '权限修改失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '权限修改失败', {
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
.operate:hover{
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
