<template>
  <div class="sidermenu">
    <el-menu
      :default-active="route"
      class="el-menu-vertical-demo"
      background-color="#0774d4"
      text-color="#fff"
      active-text-color="#80c2f8"
      router
    >
      <el-submenu index="/manage">
        <template slot="title">
          <i class="el-icon-document" />
          <span>数据管理</span>
        </template>
        <el-menu-item index="/manage/home">管理首页</el-menu-item>
        <el-menu-item index="/manage/foodlist">食品列表</el-menu-item>
        <el-menu-item index="/manage/oderList">订单列表</el-menu-item>
        <el-menu-item index="/manage/shopList">商铺列表</el-menu-item>
        <el-menu-item index="/manage/userList">用户列表</el-menu-item>
      </el-submenu>
      <el-submenu index="/add">
        <template slot="title">
          <i class="el-icon-document" />
          <span>添加数据</span>
        </template>
        <el-menu-item index="/add/addfood">添加食品</el-menu-item>
        <el-menu-item index="/add/addshop">添加商铺</el-menu-item>
      </el-submenu>
      <el-submenu index="/chart">
        <template slot="title">
          <i class="el-icon-document" />
          <span>图表</span>
        </template>
        <el-menu-item index="/chart/scattergram">用户分布</el-menu-item>
      </el-submenu>
      <el-submenu index="/edit">
        <template slot="title">
          <i class="el-icon-document" />
          <span>编辑</span>
        </template>
        <el-menu-item index="/edit/edit">文本编辑</el-menu-item>
      </el-submenu>
      <el-submenu index="/explain">

        <template slot="title">
          <i class="el-icon-document" />
          <span>说明</span>
        </template>
        <el-menu-item index="/explain/explain">说明</el-menu-item>
      </el-submenu>
      <el-submenu index="/setting">

        <template slot="title">
           <i class="el-icon-document" />
          <span>设置</span>
        </template>
        <el-menu-item index="/setting">设置</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
    </el-menu>
  </div>
</template>
<script>
// import { routes } from '@/until/filterRouter.js'
export default {
  data () {
    return {

    }
  },
  computed: {
    route () {
      return this.$route.path
    }
  },
  created () {
    // console.log(routes(this.$router.getRoutes()))
  }

}
</script>
<style lang="less" scoped>
.sidermenu .el-submenu .el-menu-item {
  width: 100%;
  min-width: none;
  color:#fff;
}
.sidermenu {
  height: 100vh;
  background-color: #0774d4;
  &/deep/ .el-menu-item {
    background-color: #1e2124 !important;

  }
}
</style>
