<template>
  <div>

    <visitor-pie :pieData="pieData"></visitor-pie>
  </div>
</template>

<script>
import visitorPie from '@/components/visitorPie.vue'
import { getuserCitycount } from '@/api/api.js'
export default {
  data () {
    return {
      pieData: {}
    }
  },
  components: {

    visitorPie
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      try {
        const res = await getuserCitycount()
        console.log(res)
        if (res.status === 1) {
          this.pieData = res.user_city
        } else {
          throw new Error(res)
        }
      } catch (err) {
        console.log('获取用户分布信息失败', err)
      }
    }
  }
}
</script>

<style lang="less">
</style>
