<template>
  <div class="perInfo">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">个人信息</span>
        <el-button style="float: right;" @click="edit">编辑</el-button>
      </div>
      <div>
        <el-row>
          <el-col :span="10">
            <el-upload
              action="/v1/user/photo"
              name="photo"
              :show-file-list="false"
              :multiple="false"
              :on-success="handleAvatarSuccess"
              :on-error="handleAvatarError"
              :before-upload="beforeAvatarUpload">
              <img v-if="photo" :src="photo">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
          <el-col :span="14">
            <div v-for="o in person" class="info">
              {{ o.label + o.name}}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-dialog title="修改个人信息" v-model="dialogFormVisible" :close-on-click-modal="false">
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="昵称" :label-width="formLabelWidth" prop = "nickname">
                <el-input v-model="form.nickname"> </el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop = "sex">
                <el-radio-group v-model="form.sex">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" :label-width="formLabelWidth" prop = "birthday">
                <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  style="width: 100%">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="工作" :label-width="formLabelWidth" prop = "job">
                <el-input v-model="form.job"></el-input>
            </el-form-item>
            <el-form-item label="权限：" :label-width="formLabelWidth" prop = "job">
                <el-input v-model="form.level" disabled></el-input>
            </el-form-item>
            <el-form-item label="何时进入公司" :label-width="formLabelWidth">
              <el-date-picker
                v-model="form.joinday"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="来自哪里" :label-width="formLabelWidth">
              <el-cascader
                expand-trigger="hover"
                :options="options"
                v-model="form.area"
                style="width: 100%">
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
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'perInfo',
  data () {
    return {
      changePerInfoUrl: ip + '/user/changeuserinformation',
      getPerInfoUrl: ip + '/user/getuserinfo',
      person: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      path: '',
      photo: '',
      form: {
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
        email: ''
      },
      options: [],
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      rules: {
        nickname: [
          {required: true, message: '请输入昵称'}
        ],
        job: [
          {required: true, message: '请输入工作'}
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
      var data = []
      vm.$http.post(this.getPerInfoUrl, {'userid': vm.form.id})
              .then((response) => {
                if (response.body.success) {
                  this.photo = this.ip + response.body.photo
                  data = [{label: '账号：', name: response.body.userid},
                          {label: '昵称：', name: response.body.username},
                          {label: '性别：', name: response.body.sex},
                          {label: '生日：', name: response.body.birthday},
                          {label: '工作：', name: response.body.job},
                          {label: '权限：', name: response.body.level},
                          {label: '何时进入公司:', name: response.body.joinday},
                          {label: '来自哪里：', name: response.body.area},
                          {label: '爱好：', name: response.body.habit},
                          {label: '电话号：', name: response.body.phone},
                          {label: '微信号：', name: response.body.weixin},
                          {label: 'qq号：', name: response.body.qq},
                          {label: '邮箱：', name: response.body.email}]
                  data.forEach(function (element) {
                    this.push(element)
                  }, this.person)
                } else {
                  this.$alert(response.body.msg, '个人信息获取失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '个人信息获取失败', {
                  confirmButtonText: '确定'
                })
              })
    },
    edit () {
      this.form.id = this.person[0].name
      this.form.nickname = this.person[1].name
      this.form.sex = this.person[2].name === '男' ? '1' : '2'
      this.form.age = this.person[3].name
      this.form.job = this.person[4].name
      this.form.level = this.person[5].name
      this.form.joinday = this.person[6].name
      this.form.area = this.person[7].name
      this.form.habit = this.person[8].name
      this.form.phone = this.person[9].name
      this.form.weixin = this.person[10].name
      this.form.qq = this.person[11].name
      this.form.email = this.person[12].name
      this.dialogFormVisible = true
      this.getData()
    },
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
                      value: element.adcode,
                      label: element.name,
                      children: []
                    }
                    this.push(pro)
                    var city = element.districts
                    city.forEach(function (ele) {
                      var ct = {
                        value: ele.adcode,
                        label: ele.name,
                        children: []
                      }
                      this.push(ct)
                      var county = ele.districts
                      county.forEach(function (e) {
                        var cty = {
                          value: e.adcode,
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
          this.person = [{label: '账号：', name: this.form.id},
                         {label: '昵称：', name: this.form.nickname},
                         {label: '性别：', name: this.form.sex === '1' ? '男' : '女'},
                         {label: '年龄：', name: this.form.age},
                         {label: '工作：', name: this.form.job},
                         {label: '权限：', name: this.form.level},
                         {label: '何时进入公司:', name: this.form.joinday},
                         {label: '来自哪里：', name: this.form.area},
                         {label: '爱好：', name: this.form.habit},
                         {label: '电话号：', name: this.form.phone},
                         {label: '微信号：', name: this.form.weixin},
                         {label: 'qq号：', name: this.form.qq},
                         {label: '邮箱：', name: this.form.email}]
          this.chanchangePerInfo()
          this.dialogFormVisible = false
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.path = res.path
      this.photo = res.path
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
    },
    changePerInfo () {
      var vm = this
      vm.$http.post(this.changePerInfoUrl, {'userid': vm.form.id, 'username': vm.form.nickname, 'birthday': vm.form.birthday, 'sex': vm.form.sex, 'job': vm.form.job, 'joinday': vm.form.joinday, 'area': vm.form.area, 'habit': vm.form.habit, 'phone': vm.form.phone, 'weixin': vm.form.weixin, 'qq': vm.form.qq, 'email': vm.form.email})
              .then((response) => {
                if (response.body.success) {
                  this.$message({
                    message: response.body.msg,
                    type: 'success'
                  })
                } else {
                  this.$alert(response.body.msg, '个人信息修改失败', {
                    confirmButtonText: '确定'
                  })
                }
              }, (response) => {
                this.$alert(response.body.msg, '个人信息修改失败', {
                  confirmButtonText: '确定'
                })
              })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.perInfo{
  width: 600px;
  margin: 50px auto;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 600px;
}
.info{
  width: 70%;
  margin: 0 auto;
}
img{
  width: 200px;
  height: 200px;
}
</style>
