<template>
  <div class="view"> 
    <el-row class="content_wrap">
      <div class="find">
        <el-button @click="addAll" style="width:24%">加载全部货物信息</el-button>
        <div class="find_img">
          <img src="../assets/find.png" alt="" v-if="showImg" @click="showInput">
        </div>
        <transition name="find">
            <div v-if="show" class="find_input">
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
  name: 'view',
  data () {
    return {
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
.find_img{
  display: inline-block;
  position: relative;
  left: 5px;
  top: 8px;
}
img{
  width: 30px;
  height: 30px;
}
.find_input{
  display: inline-block;
  width: 74%;
  margin-left: 3px;
}
.find{
  margin-bottom: 5px;
  width: 100%;
  position: relative;
}
.find-enter-active
{
animation: myfind-in 2s;
-moz-animation: myfind-in 2s;	/* Firefox */
-webkit-animation: myfind-in 2s;	/* Safari 和 Chrome */
-o-animation: myfind-in 2s;	/* Opera */
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
0%   {height: 0px; width: 0;}
100% {height: 36px; width: 100%;}
}

@-moz-keyframes myfind-in /* Firefox */
{
0%   {height: 0px; width: 0;}
100% {height: 30px; width: 100%;}
}

@-webkit-keyframes myfind-in /* Safari 和 Chrome */
{
0%   {height: 0px; width: 0;}
100% {height: 30px; width: 100%;}
}

@-o-keyframes myfind-in /* Opera */
{
0%   {height: 0px; width: 0;}
100% {height: 30px; width: 100%;}
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
