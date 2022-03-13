<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item >{{$route.meta}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align="start">
      <img :src="userInfo.avatar" class="avator" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="home">首页</el-dropdown-item>
        <el-dropdown-item command="signout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  created () {
    console.log(this.$route)
  },
  methods: {
    handleCommand (command) {
      if (command === 'home') {
        if (this.$route.path !== '/manage/home') {
          this.$router.push('/manage/home')
        }
      } else if (command === 'signout') {
        this.$store.dispatch('user/loginOut')
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  }

}
</script>
<style lang="less" scoped>
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
