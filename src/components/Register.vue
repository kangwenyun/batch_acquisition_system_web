<template>
  <div class="register">
    <el-row class="content_wrap">
      <div class="register_header">注册</div>
      <div class="content">
        <div>
          <el-form ref="form" :model="form" :rules="rules">
            <el-col :span="8">
              <div class="photo">
                <el-upload
                  action=""
                  :show-file-list="false"
                  :multiple="false"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.imageUrl" :src="form.imageUrl">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-col>
            <el-col :span="16">
              <el-form-item label="登录账号" prop = "user">
                <el-input v-model="form.user"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="form.nickname"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pwd">
                <el-input type="password" v-model="form.pwd"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="pwdAgain">
                <el-input type="password" v-model="form.pwdAgain"></el-input>
              </el-form-item>
              <el-form-item label="性别" class="item_bottom">
                <el-radio-group v-model="form.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2" class="right">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form.age"></el-input>
              </el-form-item>
              <el-form-item label="工作">
                <el-input v-model="form.job"></el-input>
              </el-form-item>
              <el-form-item label="权限级别" prop="level">
                <el-input v-model.number="form.level"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="submitForm('form')" class="width_100percent">立即注册</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </div>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'register',
  data () {
    var pwdAgainVali = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        imageUrl: '', // src/assets/a.jpg
        user: '',
        nickname: '',
        pwd: '',
        pwdAgain: '',
        sex: '1',
        age: '',
        job: '',
        level: ''
      },
      rules: {
        user: [
            {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        pwdAgain: [
            {required: true, validator: pwdAgainVali, trigger: 'blur'}
        ],
        level: [
            {required: true, message: '请输入权限级别'},
            {type: 'number', message: '年龄必须为数字值'}
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
    },
    handleAvatarSuccess (res, file) {
      console.log('21:' + file)
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPGOrPNG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPGOrPNG && isLt2M
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register_header{
    border-left: 3px solid #59AfE4;
    padding-left: 5px;
    font-size: larger;
    text-align: -webkit-left;
}
.content_wrap{
    width: 800px;
    max-width: 960px;
    min-width: 372px;
    margin: 32px auto 0 auto !important;
    padding: 0 24px;
    padding-bottom: 50px;
}
.content{
    margin: 5px auto;
    border-top: 1px solid #c0cdd9;
    padding-top: 20px;
}
.photo{
    border: 1px solid #fbfdff;
    margin-left: 25px;
    width: 200px;
    height: 200px;
    position: relative;
    cursor: pointer;
}
.photo_button{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 30px;
    height: 20px;
    opacity: 0;
    z-index: 999;
}
.edit{
    position: absolute;
    right: 0;
    bottom: 0;
    width: 20px;
    height: 20px;
    color: #69b946;
}
.el-input{
    display: block !important;
}
.el-input__inner{
    width: 58% !important;
}
label{
    width: 100px;
}
.el-form-item__error{
    top: 25% !important;
    left: 78% !important;
}
.el-button{
    width: 58%;
    margin-left: 100px !important;
    margin-top: 20px !important;
    background-color: #69b946 !important;
    height: 50px !important;
}
.footer{
    margin-left: -300px;
}
</style>
<!--<style>
.navMenu,.nav{
    display: none !important;
}
#header_text{
    display: -webkit-inline-box;
}
</style>-->
