<template>
  <div class="register">
    <div class="headr">
        <div class="header_txt">
            <i id="llogo" class="el-icon-setting"></i>
            <span id="header_txt">批次采集信息系统</span>
        </div>
    </div>
    <el-row class="content_wrap">
      <div class="findpwd_header">找回密码</div>
      <div class="content">
        <div>
          <el-form ref="form" :model="form" :rules="rules">
              <el-form-item label="登录账号" prop = "user" :label-width="formLabelWidth">
                <el-input v-model="form.user" class="input_72"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm('form')" class="width_100percent">找回</el-button>
              </el-form-item>
          </el-form>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'register',
  data () {
    return {
      forgetpasswdUrl: ip + '/user/forgetpasswd',
      formLabelWidth: '120px',
      form: {
        user: ''
      },
      rules: {
        user: [
            {required: true, message: '请输入账号', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.forgetpasswd()
        }
      })
    },
    forgetpasswd () {
      var vm = this
      vm.$http.post(this.forgetpasswdUrl, { 'userid': vm.form.user, 'passwd': vm.form.pwd, 'username': vm.form.nickname, 'birthday': vm.form.birthday, 'sex': vm.form.sex, 'job': vm.form.job, 'level': vm.form.level, 'photo': vm.form.path, 'joinday': vm.form.joinday, 'area': vm.form.area, 'habit': vm.form.habit, 'phone': vm.form.phone, 'weixin': vm.form.weixin, 'qq': vm.form.qq, 'email': vm.form.email })
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                  window.location.href = '#/'
                } else {
                  this.$alert(response.body.msg, '找回失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '找回失败', {
                  confirmButtonText: '确定'
                })
              })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headr{
    z-index: 999;
    height: 60px;
    border-bottom: 1px solid #d6dfea;
    background: #324157;
    line-height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}
.header_txt{
    margin-left: 10px;
    font-size: 30px;
    color: white;
    text-align: -webkit-left;
}
.findpwd_header{
    border-left: 3px solid #59AfE4;
    padding-left: 5px;
    font-size: larger;
    text-align: -webkit-left;
}
.content_wrap{
    width: 800px;
    max-width: 960px;
    min-width: 372px;
    margin: 92px auto 0 auto !important;
    padding: 0 24px;
    padding-bottom: 50px;
}
.content{
    margin: 5px auto;
    border-top: 1px solid #c0cdd9;
    padding-top: 70px;
}
.el-input{
    display: block !important;
}
.input_72{
    width: 72% !important;
}
.el-form-item__error{
    top: 25% !important;
    left: 78% !important;
}
.el-button{
    width: 60.5%;
    margin-left: 120px !important;
    margin-top: 20px !important;
    background-color: #69b946 !important;
    height: 50px !important;
}
</style>
