<template>
  <div class="framework">
    <div class="header">
        <div class="header_text">
            <i id="logo" class="el-icon-setting"></i>
            <span id="header_text">批次采集信息系统</span>
        </div>
        <div class="navMenu">
            <el-menu theme="dark" :default-active="activeIndex" router class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="proline">生产线信息</el-menu-item>
                <el-submenu index="1">
                    <template slot="title">批次信息</template>
                        <el-menu-item index="1-0">全部批次信息查看</el-menu-item>
                        <el-menu-item index="1-1">接受中批次信息查看</el-menu-item>
                        <el-menu-item index="1-2">审核中批次信息查看</el-menu-item>
                        <el-menu-item index="1-3">已完成批次信息查看</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">货物信息</template>
                        <el-menu-item index="2-0">货物数据查看</el-menu-item>
                        <el-menu-item index="2-1">货物数据维护</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">日志与权限</template>
                        <el-menu-item index="3-0">日志查看</el-menu-item>
                        <el-menu-item index="3-1">权限管理</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">个人信息</template>
                        <el-menu-item index="4-0">个人信息</el-menu-item>
                        <el-menu-item index="4-1">密码修改</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
    <div class="content_wrap">
        <div class="nav">
            <el-menu :default-active="activeIndex" router unique-opened class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item index="0"><i class="el-icon-menu"></i><span id="proLine_text">生产线信息</span></el-menu-item>
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-document"></i><span id="batch_text">批次信息</span></template>
                        <el-menu-item index="1-0">全部批次信息查看</el-menu-item>
                        <el-menu-item index="1-1">接受中批次信息查看</el-menu-item>
                        <el-menu-item index="1-2">审核中批次信息查看</el-menu-item>
                        <el-menu-item index="1-3">已完成批次信息查看</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-setting"></i><span id="pro_text">货物信息</span></template>
                        <el-menu-item index="2-0">货物数据查看</el-menu-item>
                        <el-menu-item index="2-1">货物数据维护</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-edit"></i><span id="log_text">日志与权限</span></template>
                        <el-menu-item index="3-0">日志查看</el-menu-item>
                        <el-menu-item index="3-1">权限管理</el-menu-item>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-star-on"></i><span id="personalInfo_text">个人信息</span></template>
                        <el-menu-item index="4-0">个人信息</el-menu-item>
                        <el-menu-item index="4-1">密码修改</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </div>
    <div class="footer">
        大连理工大学软件学院
    </div>
  </div>
</template>

<script>
export default {
  name: 'framework',
  data () {
    return {
      activeIndex: 'proline'
    }
  },
  methods: {
    // iconDown:function () {},
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
    z-index: 999;
    height: 60px;
    border-bottom: 1px solid #d6dfea;
    background: #324157;
    line-height: 60px;
    position: fixed;
    top: 0;
    width: 100%;
}
.navMenu{
    width: 590px;
    position: fixed;
    top: 0;
    right: 0;
}
.header_text{
    margin-left: 10px;
    font-size: 30px;
    color: white;
    text-align: -webkit-left;
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
        width: 50px;
        position: fixed;
        top:80px;
    }
    .el-submenu__icon-arrow{
        display: none;
    }
    #proLine_text, #batch_text, #pro_text, #log_text, #personalInfo_text{
        display: none;
    }
}
.footer{
    text-align: center;
    height: 50px;
    line-height: 50px;
    border-top: 1px solid #c0cdd9;
    position: absolute !important;
    left: 5%;
    bottom: 0;  
    width: 90%;
}
</style>
