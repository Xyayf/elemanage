<template>
    <div class="oderList">
         <el-table
    :data="data"
    stripe
    style="width:100% ;margin: 0 auto;"
    :default-sort = "{prop: 'date', order: 'descending'}"
    size='small'
    >
    <el-table-column
      type="index"
      width="80"
      label='id'>
    </el-table-column>
    <el-table-column
      prop="id"
      label="店铺id"
      sortable
      width="160">
    </el-table-column>
    <el-table-column
      prop="name"
      label="店铺名称"
      sortable
      width="160">
    </el-table-column>
    <el-table-column
      prop="status"
      label="支付状态"
     >
    </el-table-column>

  </el-table>
   <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
<div class="pagination">
      <el-pagination
  background
  layout="total, prev, pager, next, jumper"
  :total='total'
  :page-size='20'
  @current-change='handleCurrentChange'

  >
</el-pagination>
</div>
    </div>
</template>
<script>
import { getorderList, getAllOrder } from '@/api/api.js'
export default {
  data () {
    return {
      tableData: [],
      total: null,
      search: ''
    }
  },
  computed: {
    data () {
      return this.tableData.filter((item) => {
        return !this.search || item.status === this.search
      })
    }
  },

  created () {
    this.getorderLists()
    this.getAllOrder()
  },
  methods: {
    async getorderLists (limit, offset) {
      try {
        const res = await getorderList(limit, offset)
        this.tableData = res.map(item => {
          return {
            id: item.restaurant_id,
            name: item.restaurant_name,
            status: item.status_bar.title,
            userid: item.user_id,
            addressid: item.id

          }
        })
        console.log(this.tableData)
      } catch (err) {
        console.log(err)
      }
    },
    async getAllOrder () {
      try {
        const res = await getAllOrder()

        if (res.status === 1) {
          this.total = res.count
        } else {
          throw new Error('获取数量失败')
        }
        console.log(this.total, res)
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange (e) {
      const offset = (e - 1) * 20
      this.getorderLists(20, offset)
    }

  }
}
</script>
<style lang="less" scoped>
.userList{
    width: 100%;
    margin-left: 20px;

}
.pagination{
    margin-top: 10px;
    .el-pagination {

    padding: 11px 10px;}
}
</style>
