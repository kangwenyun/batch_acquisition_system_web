<template>
  <div class="app">
    <div class="header">
      <div class="header_text">
        <i id="logo" class="el-icon-setting"></i>
        <span id="header_text">批次采集信息系统</span>
      </div>
      <div class="navMenu">
        <el-menu theme="dark" :default-active="activeIndex" 
          router class="el-menu-demo" mode="horizontal" 
          v-on:click="handleClick">
          <el-menu-item index="proline">生产线信息</el-menu-item>
          <el-submenu index="checkbatch">
            <template slot="title">批次信息</template>
                <el-menu-item index="checkallbatch">全部批次信息查看</el-menu-item>
                <el-menu-item index="checkacceptancebatch">接受中批次信息查看</el-menu-item>
                <el-menu-item index="checkunderreviewbatch">审核中批次信息查看</el-menu-item>
                <el-menu-item index="checkfinishedbatch">已完成批次信息查看</el-menu-item>
          </el-submenu>
          <el-submenu index="prodataview">
            <template slot="title">货物信息</template>
                <el-menu-item index="prodataview">货物数据查看</el-menu-item>
                <el-menu-item index="prodatamaintain">货物数据维护</el-menu-item>
          </el-submenu>
          <el-submenu index="log">
            <template slot="title">权限相关</template>
                <el-menu-item index="log">日志查看</el-menu-item>
                <el-menu-item index="account">账号管理</el-menu-item>
                <el-menu-item index="level">权限管理</el-menu-item>
          </el-submenu>
          <el-submenu index="perinfo">
            <template slot="title">个人信息</template>
                <el-menu-item index="perinfo">个人信息</el-menu-item>
                <el-menu-item index="changepasswd">密码修改</el-menu-item>
                <el-menu-item index="review" v-if="reviewPage">新注册用户审核</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="logout">
          <img src="../assets/logout.png" alt="" class="logout" @click="logout">
      </div>
    </div>
    <div class="content_wrap">
      <div class="nav" @mouseover="overShow" @mouseout="outHide">
        <el-menu :default-active="activeIndex"
            router unique-opened class="el-menu-vertical-demo"
            @select="handleClick">
          <el-menu-item index="proline"><i class="el-icon-menu">
              </i><span id="proLine_text" :class="{show:showText,hide:hideText}"
                        >生产线信息</span>
          </el-menu-item>
          <el-submenu index="checkbatch">
            <template slot="title"><i class="el-icon-document"></i>
                <span id="batch_text" :class="{show:showText,hide:hideText}">批次信息</span></template>
              <el-menu-item index="checkallbatch">全部批次信息查看</el-menu-item>
              <el-menu-item index="checkacceptancebatch">接受中批次信息查看</el-menu-item>
              <el-menu-item index="checkunderreviewbatch">审核中批次信息查看</el-menu-item>
              <el-menu-item index="checkfinishedbatch">已完成批次信息查看</el-menu-item>
          </el-submenu>
          <el-submenu index="prodataview">
            <template slot="title"><i class="el-icon-setting"></i>
                <span id="pro_text" :class="{show:showText,hide:hideText}">货物信息</span></template>
              <el-menu-item index="prodataview">货物数据查看</el-menu-item>
              <el-menu-item index="prodatamaintain">货物数据维护</el-menu-item>
          </el-submenu>
          <el-submenu index="log">
            <template slot="title"><i class="el-icon-edit"></i>
                <span id="log_text" :class="{show:showText,hide:hideText}">权限相关</span></template>
              <el-menu-item index="log">日志查看</el-menu-item>
              <el-menu-item index="account">账号管理</el-menu-item>
              <el-menu-item index="level">权限管理</el-menu-item>
          </el-submenu>
          <el-submenu index="perinfo">
            <template slot="title"><i class="el-icon-star-on"></i>
                <span id="personalInfo_text" :class="{show:showText,hide:hideText}">个人信息</span></template>
              <el-menu-item index="perinfo">个人信息</el-menu-item>
              <el-menu-item index="changepasswd">密码修改</el-menu-item>
              <el-menu-item index="review" v-if="reviewPage">新注册用户审核</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
        <div class="detailData">
          <el-badge value="new" class="item" :hidden="noData">
            <el-button size="small" icon="star-off" @click="newMessage">您有新消息</el-button>
          </el-badge>
          <el-dialog title="新数据" v-model="dialogVisible">
            <el-input
                type="textarea"
                :autosize="{ minRows: 1, maxRows: 15}"
                placeholder="没有新数据"
                v-model="newDataCome">
            </el-input>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
          </el-dialog>
          <router-view></router-view>
        </div>
    </div>
    <div class="footer">
        大连理工大学软件学院
    </div>
  </div>
</template>


<script>
var ipValue = require('../glbl.js')
var ip = ipValue.ip.value
export default {
  name: 'app',
  data () {
    return {
      checkpermissionUrl: ip + '/user/checkpermission',
      id: sessionStorage.getItem('userId'),
      activeIndex: 'proline',
      showText: false,
      hideText: true,
      noData: true,
      newDataCome: '',
      reviewPage: false,
      dialogVisible: false
    }
  },
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    message: function (val) {
      this.noData = false
      this.newDataCome = val
    }
  },
  created () {
    this.checkpermission()
  },
  methods: {
    checkpermission () {
      var vm = this
      vm.$http.post(this.checkpermissionUrl, {'userid': vm.id})
              .then((response) => {
                if (response.body.success) {
                  this.reviewPage = true
                } else {
                  this.reviewPage = false
                }
              }, (response) => {
                this.reviewPage = false
              })
    },
    handleClick () {
    //   console.log('1')
    },
    overShow () {
      this.showText = !this.showText
      this.hideText = !this.hideText
    },
    outHide () {
      this.showText = !this.showText
      this.hideText = !this.hideText
    },
    newMessage () {
      this.dialogVisible = true
      this.noData = true
    },
    logout () {
      sessionStorage.clear()
      window.location.href = '#/'
    //   this.$socket.emit('newmessage', { my: 'close' })
      this.$socket.close()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.header{
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
.navMenu{
    width: 530px;
    position: fixed;
    top: 0;
    right: 30px;
}
.header_text{
    margin-left: 10px;
    font-size: 30px;
    color: white;
    text-align: -webkit-left;
}
.logout{
    width: 30px;
    height: 30px;
    position: fixed;
    top: 15px;
    right: 15px;
}
.nav{
    display: none;
}
.el-submenu__icon-arrow{
    display: none !important;
}
.content_wrap{
    margin-top: 80px;
}
.nav > ul.el-menu{
    background-color:white !important;
    border-bottom: 1px solid #eef1f6;
    border-right: 1px solid #eef1f6;
}
.el-submenu .el-menu{
    background-color:white !important;
}
@media screen and (max-width: 900px) {
    #header_text{
        display: none;
    }
    #logo{
        margin-left: 10%;
    }
}
@media screen and (max-width: 720px) {
    .show{
        display: block;
    }
    .hide{
        display: none;
    }
    .navMenu{
        display: none;
    }
    #header_text{
        display: inline-block;
        width: auto;
    }
    #logo{
        margin-left: 3%;
    }
    .nav{
        display: block;
        position: fixed;
        top:80px;
        z-index: 999;
    }
    .el-submenu__icon-arrow{
        display: none;
    }
    [class*=" el-icon-"], [class^=el-icon-]{
        position: relative;
    }
    #proLine_text, #batch_text, #pro_text, #log_text, #personalInfo_text{
        position: relative;
        left: 20px;
        top: -100%;
        margin-right: 10px;
    }
    .detailData{
        margin-left: 70px !important;
    }
}
.detailData{
    max-width: 1000px;
    min-width: 650px;
    width: 90%;
    min-height: 524px;
    margin: 0 auto;
    padding: 10px 20px;
    position: relative;
}
.footer{
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #c0cdd9;
    position: absolute !important;
    left: 5%;
    width: 90%;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
}
.item {
    position: absolute !important;
    right: 40px;
}
.show{
    display: block;
}
.hide{
    display: none !important;
}
.el-button:hover{
    background-color: #69b946 !important;
    color: white !important;
    border-color: #69b946 !important;
}
.el-dialog{
    width: 400px !important;
}
</style>
