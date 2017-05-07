<template>
  <div class="maintain">
    <div class="find">
        <i class="el-icon-edit icon_pos" v-on:mouseenter="edit"></i>
        <el-button :class="{show: edit_icon, hide: unedit_icon}" @click="editData">修改</el-button>
        <i class="el-icon-plus icon_pos" v-on:mouseenter="plus"></i>
        <el-button :class="{show: plus_icon, hide: unplus_icon}" @click="addData">增加</el-button>
        <i class="el-icon-delete icon_pos" v-on:mouseenter="delete1"></i>
        <el-button :class="{show: delete1_icon, hide: undelete1_icon}" @click="deleteData">删除</el-button>
        <i class="el-icon-delete2 icon_pos" v-on:mouseenter="delete2"></i>
        <el-button :class="{show: delete2_icon, hide: undelete2_icon}" @click="deleteAllData">删除所有</el-button>
        <i class="el-icon-document icon_pos" v-on:mouseenter="document"></i>
        <el-button :class="{show: document_icon, hide: undocument_icon}" @click="addAllData">加载全部货物信息</el-button>
        <i class="el-icon-search icon_pos" v-if="showImg" @click="showInput"></i>
        <div class="find_right">
            <transition name="find">
                <div v-if="show">
                    <el-autocomplete
                        placeholder="请输入要查询信息"
                        icon="search"
                        v-model="search"
                        :fetch-suggestions="querySearch"
                        style="width:100%"
                        @select="handleSelect">
                    </el-autocomplete>
                </div>
            </transition>
        </div>
    </div>
    <el-row class="content_wrap">
        <router-view></router-view>
        <el-table
          :data="proData"
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
          :row-class-name="tableRowClassName">
          <el-table-column
              prop="batchId"
              label="批次号">
          </el-table-column>
          <el-table-column
              prop="trayId"
              label="托盘号">
          </el-table-column>
          <el-table-column
              prop="proId"
              label="货物号">
          </el-table-column>
          <el-table-column
              prop="number"
              label="批次序号">
          </el-table-column>
          <el-table-column label="货物类型">
            <el-table-column
              prop="type_length"
              label="长">
            </el-table-column>
            <el-table-column
              prop="type_width"
              label="宽">
            </el-table-column>
            <el-table-column
              prop="type_high"
              label="高">
            </el-table-column>
          </el-table-column>
          <el-table-column
              prop="time"
              label="录入时间"
              :width="width">
          </el-table-column>
          <el-table-column
              prop="flag"
              label="备注">
          </el-table-column>
        </el-table>
    </el-row>
    <el-dialog title="货物数据修改" v-model="editDialogFormVisible" :close-on-click-modal="false">
        <el-form ref="editForm" :model="editForm" :rules="changeDataRules">
            <el-form-item label="批次号" :label-width="formLabelWidth" prop = "batchId">
                <el-input v-model="editForm.batchId"> </el-input>
            </el-form-item>
            <el-form-item label="托盘号" :label-width="formLabelWidth" prop = "trayId">
                <el-input v-model="editForm.trayId"> </el-input>
            </el-form-item>
            <el-form-item label="货物号" :label-width="formLabelWidth" prop = "proId">
                <el-input v-model="editForm.proId" disabled> </el-input>
            </el-form-item>
            <el-form-item label="批次序号" :label-width="formLabelWidth" prop = "number">
                <el-input v-model="editForm.number"> </el-input>
            </el-form-item>
            <el-form-item label="尺寸规格（长）" :label-width="formLabelWidth" prop = "type_length">
                <el-select v-model="editForm.type_length" filterable placeholder="请选择尺寸规格（长）" style="width: 100%">
                  <el-option
                    v-for="item in types_length"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    style="width: 100%">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="尺寸规格（宽）" :label-width="formLabelWidth" prop = "type_width">
                <el-select v-model="editForm.type_width" filterable placeholder="请选择尺寸规格（宽）" style="width: 100%">
                  <el-option
                    v-for="item in types_width"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="尺寸规格（高）" :label-width="formLabelWidth" prop = "type_high">
                <el-select v-model="editForm.type_high" filterable placeholder="请选择尺寸规格（高）" style="width: 100%">
                  <el-option
                    v-for="item in types_high"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="录入时间" :label-width="formLabelWidth">
                <el-date-picker
                  style="width: 100%"
                  v-model="editForm.time"
                  type="datetime"
                  :editable=false
                  placeholder="选择日期时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" prop = "flag">
                <el-input v-model.number="editForm.flag"> </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editSubmitForm('editForm')">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="货物数据增加" v-model="plusDialogFormVisible" :close-on-click-modal="false">
        <el-form ref="plusForm" :model="plusForm" :rules="changeDataRules">
            <el-form-item label="批次号" :label-width="formLabelWidth" prop = "batchId">
                <el-input v-model="plusForm.batchId"> </el-input>
            </el-form-item>
            <el-form-item label="托盘号" :label-width="formLabelWidth" prop = "trayId">
                <el-input v-model="plusForm.trayId"> </el-input>
            </el-form-item>
            <el-form-item label="货物号" :label-width="formLabelWidth" prop = "proId">
                <el-input v-model="plusForm.proId"> </el-input>
            </el-form-item>
            <el-form-item label="尺寸规格（长）" :label-width="formLabelWidth" prop = "type_length">
                <el-select v-model="plusForm.type_length" filterable placeholder="请选择尺寸规格（长）" style="width: 100%">
                  <el-option
                    v-for="item in types_length"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="尺寸规格（宽）" :label-width="formLabelWidth" prop = "type_width">
                <el-select v-model="plusForm.type_width" filterable placeholder="请选择尺寸规格（宽）" style="width: 100%">
                  <el-option
                    v-for="item in types_width"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="尺寸规格（高）" :label-width="formLabelWidth" prop = "type_high">
                <el-select v-model="plusForm.type_high" filterable placeholder="请选择尺寸规格（高）" style="width: 100%">
                  <el-option
                    v-for="item in types_high"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="录入时间" :label-width="formLabelWidth">
                <el-date-picker
                  style="width: 100%"
                  v-model="plusForm.time"
                  type="datetime"
                  :editable=false
                  placeholder="选择日期时间"
                  format="yyyy-MM-dd HH:mm:ss"
                  :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="备注" :label-width="formLabelWidth" prop = "flag">
                <el-input v-model.number="plusForm.flag"> </el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="plusDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="plusSubmitForm('plusForm')">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'proDataMaintain',
  data () {
    return {
      getproductlistUrl: ip + '/product/getproductlist',
      changeproductUrl: ip + '/product/changeproduct',
      addDataUrl: ip + '/product/QaddDataWhileRefreshBatch2',
      deleteDataUrl: ip + '/product/QdeleteDataWhileRefreshBatch',
      deleteAllDataUrl: ip + '/product/deleteallproduct',
      edit_icon: true,
      unedit_icon: false,
      plus_icon: false,
      unplus_icon: true,
      delete1_icon: false,
      undelete1_icon: true,
      delete2_icon: false,
      undelete2_icon: true,
      document_icon: false,
      undocument_icon: true,
      showImg: true,
      show: false,
      search: '',
      proData: [], // 表格里当前展示的数据
      findData: [], // 用于查找的下拉列表里的数据
      saveData: [], // 保存表格里的所有数据
      width: '180px',
      current: -1, // 表示未选中任何行
      current_row: [],
      formLabelWidth: '100px',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      editDialogFormVisible: false,
      plusDialogFormVisible: false,
      types_length: [{value: '1860', label: '1860'}, {value: '1680', label: '1680'}, {value: '1660', label: '1660'}, {value: '1580', label: '1580'}, {value: '1560', label: '1560'},
              {value: '1480', label: '1480'}, {value: '1460', label: '1460'}, {value: '1380', label: '1380'}, {value: '1360', label: '1360'}, {value: '1260', label: '1260'},
              {value: '1240', label: '1240'}, {value: '1040', label: '1040'}, {value: '974', label: '974'}, {value: '910', label: '910'}, {value: '860', label: '860'},
              {value: '810', label: '810'}, {value: '710', label: '710'}, {value: '670', label: '670'}, {value: '580', label: '580'}, {value: '460', label: '460'},
              {value: '360', label: '360'}],
      types_width: [{value: '150', label: '150'}, {value: '150/300', label: '150/300'}],
      types_high: [{value: '150', label: '150'}],
      editForm: {
        batchId: '',
        trayId: '',
        proId: '',
        number: '',
        type_length: '',
        type_width: '',
        type_high: '',
        time: '',
        flag: ''
      },
      plusForm: {
        batchId: '',
        trayId: '',
        proId: '',
        type_length: '',
        type_width: '',
        type_high: '',
        time: '',
        flag: ''
      },
      changeDataRules: {
        batchId: [
          {required: true, message: '请输入批次号'}
        ],
        trayId: [
          {required: true, message: '请输入托盘号'}
        ],
        proId: [
          {required: true, message: '请输入货物号'}
        ],
        number: [
          {required: true, message: '请输入批次序号'},
          {type: 'number', message: '批次序号必须为数字值'}
        ],
        type_length: [
          {required: true, message: '请输入货物类型（长）'}
        ],
        type_width: [
          {required: true, message: '请输入货物类型（宽）'}
        ],
        type_high: [
          {required: true, message: '请输入货物类型（高）'}
        ],
        flag: [
          {required: true, message: '请输入备注值'}
        ]
      }
    }
  },
  created () {
    this.load()
    this.loadAll()
  },
  methods: {
    load () {
      this.proData = []
      this.saveData = []
      var vm = this
      vm.$http.get(this.getproductlistUrl)
              .then((response) => {
                if (response.body.success) {
                  response.body.productlist.forEach(function (element) {
                    var data = {
                      id: element.productid,
                      batchId: element.batchid,
                      trayId: element.tray,
                      proId: element.productid,
                      number: element.number,
                      type_length: element.type_length,
                      type_width: element.type_width,
                      type_high: element.type_high,
                      time: element.time,
                      flag: element.flag
                    }
                    this.proData.push(data)
                    this.saveData.push(data)
                  }, this)
                  this.loadAll()
                } else {
                  this.$message({
                    message: response.body.msg,
                    type: 'error'
                  })
                }
              }, (response) => {
                this.$message({
                  message: response.body.msg,
                  type: 'error'
                })
              })
    },
    edit () {
      this.edit_icon = !this.edit_icon
      this.unedit_icon = !this.unedit_icon
      this.plus_icon = false
      this.unplus_icon = true
      this.delete1_icon = false
      this.undelete1_icon = true
      this.delete2_icon = false
      this.undelete2_icon = true
      this.document_icon = false
      this.undocument_icon = true
      this.date_icon = false
      this.undate_icon = true
    },
    plus (e) {
      this.plus_icon = !this.plus_icon
      this.unplus_icon = !this.unplus_icon
      this.edit_icon = false
      this.unedit_icon = true
      this.delete1_icon = false
      this.undelete1_icon = true
      this.delete2_icon = false
      this.undelete2_icon = true
      this.document_icon = false
      this.undocument_icon = true
      this.date_icon = false
      this.undate_icon = true
    },
    delete1 (e) {
      this.delete1_icon = !this.delete1_icon
      this.undelete1_icon = !this.undelete1_icon
      this.plus_icon = false
      this.unplus_icon = true
      this.edit_icon = false
      this.unedit_icon = true
      this.delete2_icon = false
      this.undelete2_icon = true
      this.document_icon = false
      this.undocument_icon = true
      this.date_icon = false
      this.undate_icon = true
    },
    delete2 (e) {
      this.delete2_icon = !this.delete2_icon
      this.undelete2_icon = !this.undelete2_icon
      this.plus_icon = false
      this.unplus_icon = true
      this.edit_icon = false
      this.unedit_icon = true
      this.delete1_icon = false
      this.undelete1_icon = true
      this.document_icon = false
      this.undocument_icon = true
      this.date_icon = false
      this.undate_icon = true
    },
    document (e) {
      this.document_icon = !this.document_icon
      this.undocument_icon = !this.undocument_icon
      this.plus_icon = false
      this.unplus_icon = true
      this.edit_icon = false
      this.unedit_icon = true
      this.delete1_icon = false
      this.undelete1_icon = true
      this.delete2_icon = false
      this.undelete2_icon = true
      this.date_icon = false
      this.undate_icon = true
    },
    showInput () {
      this.showImg = false
      this.show = true
    },
    tableRowClassName (row, index) {
      if (row.flag === 1) {
        // console.log('row:' + row + ';flag:' + row.flag)
        return 'info-row'
      }
      return ''
    },
    querySearch (queryString, cb) {
      var findData = this.findData
      var results = queryString ? findData.filter(this.createFilter(queryString)) : findData
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (pdata) => {
        return (pdata.value.indexOf(queryString) !== -1)
      }
    },
    loadAll () {
      var data = []
      this.proData.forEach(function (element) {
        var a = ' 批次号 - ' + element.batchId
        a += '; 托盘号 - ' + element.trayId + '; 货物号 - ' + element.proId
        a += '; 批次序号 - ' + element.number + '; 货物类型 - （长）' + element.type_length
        a += ';（宽）' + element.type_width + ';（高）' + element.type_high
        a += '; 录入时间 - ' + element.time + '; 备注 - ' + element.flag
        this.push({value: a})
      }, data)
      this.findData = data
    },
    handleSelect (item) {
      var value = item.value.split(';')
      this.proData = [{
        batchId: value[0].split(' - ')[1],
        trayId: value[1].split(' - ')[1],
        proId: value[2].split(' - ')[1],
        number: value[3].split(' - ')[1],
        type_length: value[4].split(' ） ')[1],
        type_width: value[5].split(' ） ')[1],
        type_high: value[6].split(' ） ')[1],
        time: value[7].split(' - ')[1],
        flag: value[8].split(' - ')[1]
      }]
    },
    handleCurrentChange (currentRow) {
      // console.log(currentRow)
      this.current_row = currentRow
      // 根据批次号查找是选中的是第几行
      this.proData.forEach(function (element, index) {
        if (element.batchId === currentRow.batchId) {
          this.current = index
          // console.log(this.current)
        }
      }, this)
    },
    hasSelect () {
      if (this.current === -1) {
        this.$alert('请先选择要修改的数据', '错误提示', {
          confirmButtonText: '去选择'
        })
        return false
      }
      return true
    },
    editData () {
      if (this.hasSelect()) {
        this.editDialogFormVisible = true
        this.editForm.batchId = this.current_row.batchId
        this.editForm.trayId = this.current_row.trayId
        this.editForm.proId = this.current_row.proId
        this.editForm.number = this.current_row.number
        this.editForm.type_length = this.current_row.type_length
        this.editForm.type_width = this.current_row.type_width
        this.editForm.type_high = this.current_row.type_high
        this.editForm.time = this.current_row.time
        this.editForm.flag = this.current_row.flag
      }
    },
    addData () {
      this.plusDialogFormVisible = true
      this.plusForm.time = Date.now()
    },
    deleteData () {
      if (this.hasSelect()) {
        this.$confirm('确定要删除该条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var vm = this
          vm.$http.post(this.deleteDataUrl, {'productid': this.proData[this.current].proId, 'batchid': this.proData[this.current].batchId})
                  .then((response) => {
                    if (response.body.success) {
                      this.proData.splice(this.current, 1)
                      this.saveData = this.proData
                    } else {
                      this.$message({
                        message: response.body.msg,
                        type: 'error'
                      })
                    }
                  }, (response) => {
                    this.$message({
                      message: response.body.msg,
                      type: 'error'
                    })
                  })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    deleteAllData () {
      this.$confirm('确定要删除所有数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var vm = this
        vm.$http.post(this.deleteAllDataUrl, {'userid': sessionStorage.getItem('userId')})
                .then((response) => {
                  if (response.body.success) {
                    this.proData = null
                    this.saveData = null
                  } else {
                    this.$message({
                      message: response.body.msg,
                      type: 'error'
                    })
                  }
                }, (response) => {
                  this.$message({
                    message: response.body.msg,
                    type: 'error'
                  })
                })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addAllData () {
      this.proData = this.saveData
    },
    editSubmitForm (editForm) {
      this.$refs[editForm].validate((valid) => {
        if (valid) {
          var vm = this
          vm.$http.post(this.changeproductUrl, {'productid': vm.editForm.proId, 'batchid': vm.editForm.batchId, 'number': vm.editForm.number, 'type_length': vm.editForm.type_length, 'type_high': vm.editForm.type_high, 'type_width': vm.editForm.type_width, 'tray': vm.editForm.trayId, 'time': vm.editForm.time, 'flag': vm.editForm.flag})
                  .then((response) => {
                    if (response.body.success) {
                      // var editValue = {
                      //   batchId: vm.editForm.batchId,
                      //   trayId: vm.editForm.trayId,
                      //   proId: vm.editForm.proId,
                      //   number: vm.editForm.number,
                      //   type_length: vm.editForm.type_length,
                      //   type_width: vm.editForm.type_width,
                      //   type_high: vm.editForm.type_high,
                      //   time: vm.editForm.time,
                      //   flag: vm.editForm.flag
                      // }
                      // this.proData.splice(this.current, 1, editValue)
                      // this.saveData = this.proData
                      this.load()
                      this.editDialogFormVisible = false
                    } else {
                      this.$message({
                        message: response.body.msg,
                        type: 'error'
                      })
                    }
                  }, (response) => {
                    this.$message({
                      message: response.body.msg,
                      type: 'error'
                    })
                  })
        }
      })
    },
    plusSubmitForm (plusForm) {
      this.$refs[plusForm].validate((valid) => {
        if (valid) {
          // var plusTime = new Date(this.plusForm.time)
          var vm = this
          vm.$http.post(this.addDataUrl, {'productid': this.plusForm.proId, 'batchid': this.plusForm.batchId, 'type_length': this.plusForm.type_length, 'type_high': this.plusForm.type_high, 'type_width': this.plusForm.type_width, 'tray': this.plusForm.trayId, 'time': this.plusForm.time, 'flag': this.plusForm.flag})
                  .then((response) => {
                    if (response.body.success) {
                      // var plusValue = {
                      //   id: this.plusForm.id,
                      //   batchId: this.plusForm.batchId,
                      //   trayId: this.plusForm.trayId,
                      //   proId: this.plusForm.proId,
                      //   number: this.plusForm.number,
                      //   type_length: this.editForm.type_length,
                      //   type_width: this.editForm.type_width,
                      //   type_high: this.editForm.type_high,
                      //   time: plusTime.getFullYear() + '-' + plusTime.getMonth() + '-' + plusTime.getDate() + ' ' + plusTime.getHours() + ':' + plusTime.getMinutes() + ':' + plusTime.getSeconds(),
                      //   flag: this.plusForm.flag
                      // }
                      // this.proData.push(plusValue)
                      // this.saveData = this.proData
                      this.load()
                      this.plusDialogFormVisible = false
                    } else {
                      this.$message({
                        message: response.body.msg,
                        type: 'error'
                      })
                    }
                  }, (response) => {
                    this.$message({
                      message: response.body.msg,
                      type: 'error'
                    })
                  })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.maintain{
  margin-top: 35px;
}
.show{
  display: inline-block;
}
.hide{
  display: none;
}
.find_right{
  width: 50%;
  float: right;
}
.icon_pos{
  position: relative;
  top: 8px;
}
.find{
  margin-bottom: 5px;
  width: 100%;
  height: 30px;
  position: relative;
}
.find-enter-active
{
animation: myfind-in 1s;
-moz-animation: myfind-in 1s;	/* Firefox */
-webkit-animation: myfind-in 1s;	/* Safari 和 Chrome */
-o-animation: myfind-in 1s;	/* Opera */
}
.find-leave-active
{
animation: myfind-out 3s;
-moz-animation: myfind-out 3s;	/* Firefox */
-webkit-animation: myfind-out 3s;	/* Safari 和 Chrome */
-o-animation: myfind-out 3s;	/* Opera */
}
@keyframes myfind-in
{
0%   {height: 0px; width: 0px;}
100% {height: 36px; width: 200px;}
}

@-moz-keyframes myfind-in /* Firefox */
{
0%   {height: 0px; width: 0px;}
100% {height: 30px; width: 200px;}
}

@-webkit-keyframes myfind-in /* Safari 和 Chrome */
{
0%   {height: 0px; width: 0px;}
100% {height: 30px; width: 200px;}
}

@-o-keyframes myfind-in /* Opera */
{
0%   {height: 0px; width: 0px;}
100% {height: 30px; width: 200px;}
}
@keyframes myfind-out
{
0%   {height: 36px; width: 100%;}
100% {height: 0px; width: 0px;}
}

@-moz-keyframes myfind-out /* Firefox */
{
0%   {height: 36px; width: 100%;}
100% {height: 0px; width: 0px;}
}

@-webkit-keyframes myfind-out /* Safari 和 Chrome */
{
0%   {height: 36px; width: 100%;}
100% {height: 0px; width: 0px;}
}

@-o-keyframes myfind-out /* Opera */
{
0%   {height: 36px; width: 100%;}
100% {height: 0px; width: 0px;}
}
.find_icon{
    height:36px;
    line-height: 36px;
}
.info-row {
    background-color: #b1b3b5;
    color: white;
}
.info-row:hover{
    color: black;
}
.content_wrap{
    margin-top: 16px;
}
.el-table th{
  background: #324157;
}
.el-table__header-wrapper thead div{
  background: #324157;
  color: white;
}
</style>
<style>
.el-alert{
  width: 350px;
  margin: 0 auto;
}
</style>
