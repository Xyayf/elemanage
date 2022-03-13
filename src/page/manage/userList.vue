<template>
    <div class="userList">
         <el-table
    :data="tableData"
    style="width:100% ;margin: 0 auto;"
   show-header
    :default-sort = "{prop: 'date', order: 'descending'}"
    size='small'
    >
    <el-table-column
      type="index"
      width="80"
      label='id'>
    </el-table-column>
    <el-table-column
      prop="date"
      label="注册时间"
      sortable
      width="160">
    </el-table-column>
    <el-table-column
      prop="username"
      label="用户名"
      sortable
      width="160">
    </el-table-column>
    <el-table-column
      prop="username"
      label="注册地址"
     >
    </el-table-column>
  </el-table>
<div class="pagination">
      <el-pagination
  background
  layout="total, prev, pager, next, jumper"
  :total='total'
  :page-size='20'
  @current-change='handleCurrentChange'
   @size-change="handleSizeChange"
  >
</el-pagination>
</div>
    </div>
</template>
<script>
import { getuserList, getAllregiste } from '@/api/api.js'
export default {
  data () {
    return {
      tableData: [],
      total: null
    }
  },
  created () {
    this.getAllregiste()
  },
  methods: {
    async getTableData (offset, limit) {
      try {
        const res = await getuserList(offset, limit)
        this.tableData = res.map((item, index) => {
          return {
            username: item.username,
            city: item.city,
            date: item.registe_time

          }
        })
      } catch (err) { console.log(err) }
    },
    async getAllregiste () {
      try {
        const res = await getAllregiste()
        if (res.status === 1) {
          this.total = res.count
          console.log(this.total)
        } else {
          throw new Error('获取数据失败')
        }
        this.getTableData()
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange (e) {
      const offset = (e - 1) * 20
      this.getTableData(20, offset)
    },
    handleSizeChange (e) {
      console.log(e, 'size')
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
