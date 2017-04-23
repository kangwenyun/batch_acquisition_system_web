<template>
  <div class="perInfo">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="line-height: 36px;">个人信息</span>
        <el-button style="float: right;" @click="edit">编辑</el-button>
      </div>
      <div>
        <el-row>
          <el-col :span="12">
            <img src="../assets/a.jpg" alt="">
          </el-col>
          <el-col :span="12">
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
            <el-form-item label="年龄" :label-width="formLabelWidth" prop = "age">
                <el-input v-model.number="form.age"> </el-input>
            </el-form-item>
            <el-form-item label="工作" :label-width="formLabelWidth" prop = "job">
                <el-input v-model="form.job"></el-input>
            </el-form-item>
            <el-form-item label="权限" :label-width="formLabelWidth" prop = "level">
                <el-input v-model.number="form.level"> </el-input>
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
export default {
  name: 'perInfo',
  data () {
    return {
      person: [],
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: {
        id: '',
        nickname: '',
        sex: '',
        age: '',
        job: '',
        level: ''
      },
      rules: {
        nickname: [
          {required: true, message: '请输入昵称'}
        ],
        age: [
          {required: true, message: '请输入年龄'},
          {type: 'number', message: '年龄必须为数字值'}
        ],
        job: [
          {required: true, message: '请输入工作'}
        ],
        level: [
          {required: true, message: '请输入权限等级'},
          {type: 'number', message: '权限等级必须为数字值'}
        ]
      }
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      var data = [{label: '账号：', name: 'A'},
                  {label: '昵称：', name: 'A'},
                  {label: '性别：', name: 'A'},
                  {label: '年龄：', name: 1},
                  {label: '工作：', name: 'A'},
                  {label: '权限：', name: 1}]
      data.forEach(function (element) {
        this.push(element)
      }, this.person)
    },
    edit () {
      this.form.id = this.person[0].name
      this.form.nickname = this.person[1].name
      this.form.sex = this.person[2].name === '男' ? '1' : '2'
      this.form.age = this.person[3].name
      this.form.job = this.person[4].name
      this.form.level = this.person[5].name
      this.dialogFormVisible = true
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.person = [{label: '账号：', name: this.form.id},
                         {label: '昵称：', name: this.form.nickname},
                         {label: '性别：', name: this.form.sex === '1' ? '男' : '女'},
                         {label: '年龄：', name: this.form.age},
                         {label: '工作：', name: this.form.job},
                         {label: '权限：', name: this.form.level}]
          this.dialogFormVisible = false
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.perInfo{
  width: 480px;
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
  width: 480px;
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
