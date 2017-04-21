<template>
  <div class="proDataMaintain">
    <div class="find">
        <i class="el-icon-edit icon_pos" v-on:mouseenter="edit"></i>
        <el-button :class="{show: edit_icon, hide: unedit_icon}">修改</el-button>
        <i class="el-icon-plus icon_pos" v-on:mouseenter="plus"></i>
        <el-button :class="{show: plus_icon, hide: unplus_icon}">增加</el-button>
        <i class="el-icon-delete icon_pos" v-on:mouseenter="delete1"></i>
        <el-button :class="{show: delete1_icon, hide: undelete1_icon}">删除</el-button>
        <i class="el-icon-delete2 icon_pos" v-on:mouseenter="delete2"></i>
        <el-button :class="{show: delete2_icon, hide: undelete2_icon}">删除所有</el-button>
        <i class="el-icon-document icon_pos" v-on:mouseenter="document"></i>
        <el-button :class="{show: document_icon, hide: undocument_icon}" @click="addAll">加载全部货物信息</el-button>
        <i class="el-icon-date icon_pos" v-on:mouseenter="date"></i>
        <el-date-picker
            :class="{show: date_icon, hide: undate_icon}"
            v-model="date"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
        </el-date-picker>
        <i class="el-icon-search icon_pos" v-if="showImg" @click="showInput"></i>
        <!--<img src="../images/find.png" alt="" v-if="showImg" @click="showInput">-->
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
          :row-class-name="tableRowClassName">
          <el-table-column
              prop="id"
              label="id"
              width="100">
          </el-table-column>
          <el-table-column
              prop="batchId"
              label="批次号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="trayId"
              label="托盘号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="proId"
              label="货物号"
              width="100">
          </el-table-column>
          <el-table-column
              prop="proType"
              label="货物类型"
              width="100">
          </el-table-column>
          <el-table-column
              prop="time"
              label="录入时间"
              width="200">
          </el-table-column>
          <el-table-column
              prop="flag"
              label="备注">
          </el-table-column>
        </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
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
      date_icon: false,
      undate_icon: true,
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      showImg: true,
      show: false,
      search: '',
      proData: [],
      findData: [],
      saveData: []
    }
  },
  created () {
    this.load()
  },
  mounted () {
    this.findData = this.loadAll()
  },
  methods: {
    load () {
      var data = [{
        id: '',
        batchId: 'A1',
        trayId: 'T1',
        proId: '1',
        proType: 'A',
        time: '2017-04-13 08:24:36',
        flag: 0
      }, {
        id: '',
        batchId: 'A2',
        trayId: 'T1',
        proId: '1',
        proType: 'A',
        time: '2017-04-13 08:24:36',
        flag: 0
      }, {
        id: '',
        batchId: 'A3',
        trayId: 'T1',
        proId: '1',
        proType: 'A',
        time: '2017-04-13 08:24:36',
        flag: 1
      }]
      data.forEach(function (element) {
        this.proData.push(element)
        this.saveData.push(element)
      }, this)
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
    date (e) {
      this.date_icon = !this.date_icon
      this.undate_icon = !this.date_icon
      this.plus_icon = false
      this.unplus_icon = true
      this.edit_icon = false
      this.unedit_icon = true
      this.delete1_icon = false
      this.undelete1_icon = true
      this.delete2_icon = false
      this.undelete2_icon = true
      this.document_icon = false
      this.undocument_icon = true
    },
    showInput () {
      this.showImg = false
      this.show = true
    },
    handleIconClick (ev) {
      console.log(ev)
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
        var a = 'id - ' + element.id + '; 批次号 - ' + element.batchId
        a += '; 托盘号 - ' + element.trayId + '; 货物号 - ' + element.proId
        a += '; 货物类型 - ' + element.proType
        a += '; 录入时间 - ' + element.time + '; 备注 - ' + element.flag
        this.push({value: a})
      }, data)
      return data
    },
    handleSelect (item) {
      var value = item.value.split(';')
      var data = {
        id: value[0].split(' - ')[1],
        batchId: value[1].split(' - ')[1],
        trayId: value[2].split(' - ')[1],
        proId: value[3].split(' - ')[1],
        proType: value[4].split(' - ')[1],
        time: value[5].split(' - ')[1],
        flag: value[6].split(' - ')[1]
      }
      this.proData = []
      this.proData.push(data)
    },
    addAll () {
      this.proData = this.saveData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
animation: myfind-in 3s;
-moz-animation: myfind-in 3s;	/* Firefox */
-webkit-animation: myfind-in 3s;	/* Safari 和 Chrome */
-o-animation: myfind-in 3s;	/* Opera */
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
