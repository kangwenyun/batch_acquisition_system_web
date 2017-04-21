<template>
  <div class="app">
        <el-row class="content_wrap">
            <div class="change_header">密码修改</div>
            <div class="content">
                <el-form ref="form" :model="form" :rules="rules">
                    <el-form-item label="登录账号" label-width="100px">
                        <el-input v-model="form.user" disabled class="input_85"></el-input>
                    </el-form-item>
                    <el-form-item label="原密码  " prop="oldPwd" label-width="100px">
                        <el-input v-model="form.nickname" class="input_85"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPwd" label-width="100px">
                        <el-input type="password" v-model="form.pwd" class="input_85"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="newPwdAgain" label-width="100px">
                        <el-input type="password" v-model="form.pwdAgain" class="input_85"></el-input>
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
export default {
  name: 'changepasswd',
  data () {
    var pwdAgainVali = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次新密码输入不一致!'))
      } else {
        callback()
      }
    }
    return {
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
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content_wrap{
    max-width: 800px;
    min-width: 372px;
    width: 70%;
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
