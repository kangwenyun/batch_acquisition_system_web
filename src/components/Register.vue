<template>
  <div class="register">
    <div class="headr">
        <div class="header_txt">
            <i id="llogo" class="el-icon-setting"></i>
            <span id="header_txt">批次采集信息系统</span>
        </div>
    </div>
    <el-row class="content_wrap">
      <div class="register_header">注册</div>
      <div class="content">
        <div>
          <el-form ref="form" :model="form" :rules="rules">
            <el-col :span="8">
              <div class="photo">
                <el-upload
                  action="http://172.40.135.211:3000/v1/user/photo"
                  name="photo"
                  :show-file-list="false"
                  :multiple="false"
                  :on-success="handleAvatarSuccess"
                  :on-error="handleAvatarError"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.imageUrl" :src="form.imageUrl" width="210px">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-col>
            <el-col :span="16">
              <el-form-item label="登录账号" prop = "user" :label-width="formLabelWidth">
                <el-input v-model="form.user" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="form.nickname" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pwd" :label-width="formLabelWidth">
                <el-input type="password" v-model="form.pwd" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="pwdAgain" :label-width="formLabelWidth">
                <el-input type="password" v-model="form.pwdAgain" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="性别" class="item_bottom" :label-width="formLabelWidth">
                <el-radio-group v-model="form.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="生日" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.birthday"
                  class="input_72"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="工作" :label-width="formLabelWidth">
                <el-input v-model="form.job" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="何时进入公司？" :label-width="formLabelWidth">
                <el-date-picker
                  v-model="form.joinday"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  class="input_72">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="来自哪里？" :label-width="formLabelWidth">
                <el-cascader
                  expand-trigger="hover"
                  :options="options"
                  v-model="form.area"
                  class="input_72">
                </el-cascader>
              </el-form-item>
              <el-form-item label="爱好" :label-width="formLabelWidth">
                <el-input v-model="form.habit" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="电话号" :label-width="formLabelWidth">
                <el-input v-model="form.phone" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="微信号" :label-width="formLabelWidth">
                <el-input v-model.number="form.weixin" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="qq号" :label-width="formLabelWidth">
                <el-input v-model.number="form.qq" class="input_72"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" class="input_72"></el-input>
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
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
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
      registUrl: ip + '/user/regist',
      formLabelWidth: '120px',
      form: {
        path: '',
        imageUrl: '', // src/assets/a.jpg
        user: '',
        nickname: '',
        pwd: '',
        pwdAgain: '',
        sex: '1',
        birthday: '1977-01-01',
        job: '',
        joinday: '',
        area: [],
        habit: '',
        phone: '',
        weixin: '',
        qq: '',
        email: ''
      },
      options: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      rules: {
        user: [
            {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        pwd: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 4, message: '长度要大于 4 个字符', trigger: 'blur'}
        ],
        pwdAgain: [
            {required: true, validator: pwdAgainVali, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      var vm = this
      var cityUrl = 'http://restapi.amap.com/v3/config/district?subdistrict=4&key=8365fd9e511e8788feeeac4e70fcb12a'
      vm.$http.get(cityUrl)
              .then((response) => {
                // console.log(response)
                if (response.body.status) {
                  var province = response.body.districts[0].districts
                  province.forEach(function (element) {
                    var pro = {
                      value: element.name,
                      label: element.name,
                      children: []
                    }
                    this.push(pro)
                    var city = element.districts
                    city.forEach(function (ele) {
                      var ct = {
                        value: ele.name,
                        label: ele.name,
                        children: []
                      }
                      this.push(ct)
                      var county = ele.districts
                      county.forEach(function (e) {
                        var cty = {
                          // value: e.adcode,
                          value: e.name,
                          label: e.name
                        }
                        this.push(cty)
                      }, ct.children)
                    }, pro.children)
                  }, this.options)
                } else {
                  this.$message({
                    message: '获取失败',
                    type: 'error'
                  })
                }
              }, (response) => {
                this.$message({
                  message: '获取失败',
                  type: 'error'
                })
              })
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.regist()
        }
      })
    },
    regist () {
      var vm = this
      var pass = this.compileStr(this.form.pwd)
      vm.$http.post(this.registUrl, { 'userid': this.form.user, 'passwd': pass, 'username': this.form.nickname, 'birthday': this.form.birthday, 'sex': this.form.sex, 'job': this.form.job, 'photo': this.form.path, 'joinday': this.form.joinday, 'area': this.form.area, 'habit': this.form.habit, 'phone': this.form.phone, 'weixin': this.form.weixin, 'qq': this.form.qq, 'email': this.form.email })
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                  // 跳转到登录界面
                  window.location.href = '#/'
                } else {
                  this.$alert(response.body.msg, '注册失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '注册失败', {
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
    },
    handleAvatarSuccess (res, file) {
      this.form.path = res.path
      this.form.imageUrl = 'http://172.40.135.211:3000' + res.path
    },
    handleAvatarError (res, file) {
      this.$message.error('上传失败TT')
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
  .headr{
    z-index: 999;
    height: 80px;
    border-bottom: 1px solid #d6dfea;
    background: #20a0ff;
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
    margin: 112px auto 0 auto !important;
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
.input_72{
    width: 72% !important;
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
