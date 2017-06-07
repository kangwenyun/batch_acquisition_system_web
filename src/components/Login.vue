<template>
    <div id="login">
        <div class="headr">
            <div class="header_txt">
                <i id="llogo" class="el-icon-setting"></i>
                <span id="header_txt">批次采集信息系统</span>
            </div>
        </div>
        <el-row class="content_wrap">
          <el-col :span="16">
              <div>
                  <el-carousel>
                      <el-carousel-item v-for="item in 4" :key="item">
                          <img v-if="item == 1" src='../assets/b.jpg' alt="图片" class="width_100percent">
                          <img v-else-if="item == 2" src='../assets/c.jpg' alt="图片" class="width_100percent">
                          <img v-else-if="item == 3" src='../assets/d.jpg' alt="图片" class="width_100percent">
                          <img v-else src='../assets/e.jpg' alt="图片" class="width_100percent">
                      </el-carousel-item>
                  </el-carousel>
              </div>
          </el-col>
          <el-col :span="8">
            <div class="login">
                <div class="login_header">账号密码登录</div>
                <div class="login_tips"></div>
                <div class="login_body">
                    <el-form ref="form" :model="form" :rules="rules">
                        <el-form-item prop="user">
                            <el-input v-model="form.user" placeholder="请输入登录账号" icon="circle-cross" :on-icon-click="clearUserInput"></el-input>
                        </el-form-item>
                        <el-form-item prop="pwd">
                            <el-input type="password" v-model="form.pwd" placeholder="请输入登录密码" icon="circle-cross" :on-icon-click="clearPwdInput" @keyup.enter.native="submitForm('form')"></el-input>
                        </el-form-item>
                        <el-form-item v-if="form.error" class="error">
                            账号或密码不对
                        </el-form-item>
                        <el-form-item class="item_bottom">
                          <el-checkbox class="rememberPwd" v-model="form.rememberPwd">记住我</el-checkbox>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="submitForm('form')" class="width_100percent">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="login_bottom">
                    <a href="#/forgetpasswd" class="bottom">忘记密码?</a>
                    <span class="dividing_line"></span>
                    <a href="#/register" class="bottom">注册新账号</a>
                </div>
            </div>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import Vue from 'vue'
import VueSocketio from 'vue-socket.io'
import socketio from 'socket.io-client'
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'login',
  data () {
    return {
      loginUrl: ip + '/user/login',
      form: {
        user: '',
        pwd: '',
        error: false,
        rememberPwd: true
      },
      rules: {
        user: [
          {required: true, message: '请输入登录账号', trigger: 'blur'}
        ],
        pwd: [
          {required: true, message: '请输入登录密码', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.autoLogin()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login () {
      var vm = this
      vm.$http.post(this.loginUrl, {'userid': vm.form.user, 'passwd': vm.form.pwd})
              .then((response) => {
                if (response.body.success) {
                  sessionStorage.setItem('userId', this.form.user)
                  window.location.href = '#/framework/proLine'
                  // 连socket.io
                  Vue.use(VueSocketio, socketio(ipValue.socketip.value))
                  // 检查是否需要记住密码
                  console.log(this.form.rememberPwd)
                  if (this.form.rememberPwd) {
                    this.setCookie(this.form.user, this.form.pwd)
                  } else {
                    // 删除cookie
                    this.delCookie(this.form.user)
                  }
                } else {
                  this.$alert(response.body.msg, '登录失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '登录失败1', {
                  confirmButtonText: '确定'
                })
              })
    },
    setCookie (name, value) {
      var expires = new Date()
      expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000 * 7)
      document.cookie = name + '=' + escape(value) + ';expires=' + expires.toGMTString()
    },
    getCookie (name) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(name + '=')
        if (start !== -1) {
          start = start + name.length + 1
          var end = document.cookie.indexOf(',', start)
          if (end === -1) {
            end = document.cookie.length
          }
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 删除cookie
    delCookie (name) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var val = this.getCookie(name)
      if (val !== null) {
        document.cookie = name + '=' + val + ';expires=' + exp.toGMTString()
      }
    },
    autoLogin () {
      if (document.cookie !== null) {
        this.form.user = document.cookie.split('=')[0]
        this.form.pwd = document.cookie.split('=')[1]
      }
    },
    clearUserInput () {
      this.form.user = ''
    },
    clearPwdInput () {
      this.form.pwd = ''
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
.content_wrap{
    max-width: 960px;
    min-width: 372px;
    margin: 72px auto 0 auto !important;
    padding: 0 24px;
    padding-bottom: 50px;
}
.width_100percent{
    width: 100%;
}
.login{
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    width: 334px;
    margin: 0 auto;
    position: inherit;
}
.login_header{
    height: 45px;
    font-family: "lucida Grande",Verdana,"Microsoft YaHei";
    border-bottom: 1px solid #c0cdd9;
    background-color: #f9fbfe;
    color: #333;
    line-height: 45px;
    text-align: center;
}
.login_tips {
    min-height: 28px;
    height: auto;
    padding-top: 4px;
}
.login_body{
    width: 304px;
    margin: 0 auto;
    height: 360px;
}
.el-input__inner{
    height: 42px !important;
    font-size: medium !important;
}
.rememberPwd{
  position: absolute;
  left: 0;
}
.el-button{
    height: 42px !important;
    font-size: large !important;
    background-color: #5a98de !important;
    color: white !important;
}
.item_bottom{
    height: 30px;
    margin-bottom: 12px !important;
}
.login_bottom{
    right: 15px;
    height: 16px;
    position: relative;
    text-align: right;
    font-size: 12px;
    bottom: 10px;
}
a{
    color: #225592;
    text-decoration: none;
}
a:hover{
    text-decoration: underline;
}
.dividing_line{
    background-color: #c0cdd9;
    width: 1px;
    display: inline-block;
    height: 10px;
    margin: 0 5px;
}
.error{
    color: red;
}
.el-form-item{
  margin-bottom: 20px;
}
</style>
