<template>
  <div class="changepasswd">
        <el-row class="content_wrap">
            <div class="change_header">密码修改</div>
            <div class="content">
                <el-form ref="form" :model="form" :rules="rules">
                    <el-form-item label="登录账号" label-width="100px">
                        <el-input v-model="form.user" disabled class="input_85"></el-input>
                    </el-form-item>
                    <el-form-item label="原密码  " prop="oldPwd" label-width="100px">
                        <el-input type="password" v-model="form.oldPwd" class="input_85"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd" label-width="100px">
                        <el-input type="password" v-model="form.newPwd" class="input_85"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="newPwdAgain" label-width="100px">
                        <el-input type="password" v-model="form.newPwdAgain" class="input_85"></el-input>
                    </el-form-item>
                    <el-form-item label-width="100px">
                        <el-button @click="submitForm('form')" class="width_100percent">立即修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-row>
    </div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'changepasswd',
  data () {
    var pwdAgainVali = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPwd) {
        callback(new Error('两次新密码输入不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwdUrl: ip + '/user/changepasswd',
      form: {
        user: sessionStorage.getItem('userId'),
        oldPwd: '',
        newPwd: '',
        newPwdAgain: ''
      },
      rules: {
        oldPwd: [
            {required: true, message: '请输入原密码', trigger: 'blur'}
        ],
        newPwd: [
            {required: true, message: '请输入新密码', trigger: 'blur'}
        ],
        newPwdAgain: [
            {required: true, validator: pwdAgainVali, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.changePwd()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changePwd () {
      var vm = this
      var oldpasswd = this.compileStr(this.form.oldPwd)
      var newpasswd = this.compileStr(this.form.newPwd)
      vm.$http.post(this.passwdUrl, {'userid': this.form.user, 'oldpasswd': oldpasswd, 'newpasswd': newpasswd})
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                } else {
                  this.$alert(response.body.msg, '密码修改失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '密码修改失败', {
                  confirmButtonText: '确定'
                })
              })
    },
    compileStr (code) { // 对字符串进行加密
      var c = String.fromCharCode(code.charCodeAt(0) + code.length)
      for (var i = 1; i < code.length; i++) {
        c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1))
      }
      return escape(c)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.changepasswd{
  margin-top: 75px;
}
.content_wrap{
    max-width: 800px;
    min-width: 372px;
    margin: 32px auto 0 auto !important;
    padding: 0 24px;
    padding-bottom: 50px;
}
.change_header{
    border-left: 3px solid #59AfE4;
    padding-left: 5px;
    font-size: larger;
    text-align: -webkit-left;
}
.content{
    margin: 5px auto;
    border-top: 1px solid #c0cdd9;
    padding-top: 20px;
}
.input_85{
    width: 85%;
    display: inline-block;
}
.el-form-item__error{
    top: 25%;
    left: 78%;
}
.el-button{
    width: 85%;
    margin-top: 20px;
    background-color: #69b946;
    height: 50px;
}
</style>
