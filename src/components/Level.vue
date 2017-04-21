<template>
  <div class="level">
    <el-table
        :data="levelData"
        highlight-current-row
        style="width: 100%;margin-top: 40px;">
        <el-table-column
            prop="id"
            label="账号">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="账号名">
        </el-table-column>
        <el-table-column
            prop="level"
            label="权限等级">
        </el-table-column>
        <el-table-column
            label="操作">
            <template scope="scope">
                <el-button @click="edit(scope.$index, scope.row)" type="text" size="small">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="权限修改" v-model="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="原权限" :label-width="formLabelWidth">
                <el-input v-model="form.oldLevel" disabled></el-input>
            </el-form-item>
            <el-form-item label="新权限" :label-width="formLabelWidth" prop = "newLevel">
                <el-input v-model.number="form.newLevel"> </el-input>
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
  name: 'level',
  data () {
    return {
      levelData: [],
      dialogFormVisible: false,
      formLabelWidth: '70px',
      form: {
        oldLevel: '',
        newLevel: ''
      },
      rules: {
        newLevel: [
            {required: true, message: '请输入新权限'},
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
      var data = [{
        id: 'admin',
        userName: 'admin',
        level: '0'
      }, {
        id: 'admin',
        userName: 'admin',
        level: '1'
      }, {
        id: 'admin',
        userName: 'admin',
        level: '0'
      }]
      data.forEach(function (element) {
        this.push(element)
      }, this.levelData)
    },
    edit (index, row) {
    //   console.log(index)
    //   console.log('------------')
    //   console.log(row)
      this.dialogFormVisible = true
      this.form.oldLevel = row.level
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log('succeed~~~')
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.dialogFormVisible = false
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
</style>
