<template>
  <div class="review">
    <el-table
        :data="registerPersonList"
        highlight-current-row
        style="width: 100%;margin-top: 40px;"
        empty-text="暂时还没有新注册的账户">
        <el-table-column
            fixed
            prop="id"
            label="账号">
        </el-table-column>
        <el-table-column
            prop="nickname"
            label="昵称">
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
export default {
  name: 'review',
  data () {
    // var ip = 'http://192.168.1.122:3000/v1'
    var ip = 'http://192.168.137.1:3000/v1'
    return {
      getPerInfoUrl: ip + '/user/getuserinfo',
      registerPersonList: [],
      dialogFormVisible: false,
      formLabelWidth: '70px',
      columuWidth: '126px',
      id: sessionStorage.getItem('userId'),
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
      var vm = this
      // var data = []
      vm.$http.post(this.getPerInfoUrl, {'userid': vm.id})
              .then((response) => {
                if (response.body.success) {
                  var data = {
                    id: response.body.userid,
                    nickname: response.body.username,
                    sex: response.body.sex,
                    birthday: response.body.birthday,
                    job: response.body.job,
                    level: response.body.level,
                    joinday: response.body.joinday,
                    area: response.body.area,
                    habit: response.body.habit,
                    phone: response.body.phone,
                    weixin: response.body.weixin,
                    qq: response.body.qq,
                    email: response.body.email
                  }
                  this.registerPersonList.push(data)
                  // data.forEach(function (element) {
                  //   this.push(element)
                  // }, this.registerPersonList)
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
    addLevel (index, row) {
    //   console.log(index)
    //   console.log('------------')
    //   console.log(row)
      this.dialogFormVisible = true
      // this.form.oldLevel = row.level
    },
    pass (index, row) {
      // var level = row.userId
    },
    notPass (index, row) {
    // var level = row.userId
    },
    submitForm (addForm) {
      this.$refs[addForm].validate((valid) => {
        if (valid) {
          this.changeLevel()
          this.dialogFormVisible = false
        }
      })
    },
    changeLevel () {
      var vm = this
      vm.$http.post(this.changeLevelUrl, {'userid': vm.id, 'newlevel': vm.level})
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
