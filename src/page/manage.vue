<template>
  <div class="manage">
    <el-row>
      <el-col :span="6" style="min-width: 210px"
        ><div class="grid-content bg-purple">
          <siderMenu /></div
      ></el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple">
            <div class="contain">
                        <head-top />
          <router-view />
            </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import headTop from '@/components/headTop.vue'
import siderMenu from '@/components/sidermenu.vue'
export default {
  components: {
    siderMenu,
    headTop
  }
}
</script>
<style lang="less" scoped>
.el-col-6 {
  max-height: none;
}
.contain{
  max-height: 100vh;
  overflow: auto;
}
</style>
