<template>
    <div class="shoplist">
         <el-table
    :data="tableData"
    style="width:100% ;margin: 0 auto;"
   show-header
    :default-sort = "{prop: 'date', order: 'descending'}"
    size='small'
    >
     <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="店铺名称：">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="店铺介绍：">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺ID：">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺地址：">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述：">
            <span>{{ props.row.description }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
    prop='name'
      width="100"
      label='店铺名称'>
    </el-table-column>
    <el-table-column
      prop="address"
      label="店铺地址"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="店铺描述"
      sortable
      width="140">
    </el-table-column>
 <el-table-column label="操作">
      <template slot-scope="scope">
       <div class="contain">
            <el-button
          size="mini"
          @click="handleadd(scope.$index, scope.row)">添加食品</el-button>
                      <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
       </div>
      </template>
    </el-table-column>
  </el-table>
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
<div class="dialog">
    <el-dialog title="修改店铺信息" :visible.sync="dialogTableVisible">
  <el-form :model="shopForm" >
    <el-form-item label="店铺名称" >
      <el-input v-model="shopForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="详细地址" >
   <el-select
    v-model="shopForm.selectaddress"
    filterable
    remote
    reserve-keyword
    :remote-method="remoteMethod"
    :loading="loading">
    <el-option
      v-for="item in searchAddres"
      :key="item.name"
      :label="item.name"
      :value="item.address">
    </el-option>
  </el-select>
<span>当前城市{{city}}</span>
    </el-form-item>
    <el-form-item label="店铺介绍">
      <el-input v-model="shopForm.description" autocomplete="off"></el-input>
    </el-form-item >
<el-form-item label="店铺分类">
     <el-cascader
      v-model="shopForm.category"
    :options="options"
    filterable
    ></el-cascader>
</el-form-item>
  <el-form-item label='商铺图片' required>
<el-upload
  class="avatar-uploader"
  action="/v1/addimg/shop"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTable">取 消</el-button>
    <el-button type="primary" @click="dialogTable">确 定</el-button>
  </div>
</el-dialog>
</div>
    </div>
</template>
<script>
import { getRestaList, getlocation, getRestaCount, deleteShop, getcategory, searchAddres, postUpdatshop } from '@/api/api.js'
export default {
  data () {
    return {
      tableData: [],
      total: null,
      latitude: '',
      longitude: '',
      city: '',
      dialogTableVisible: false,
      options: [],
      searchAddres: [],
      loading: false,
      imageUrl: '',
      shopForm: {
        id: null,
        name: null,
        description: null,
        imagepath: null,
        category: null,
        selectaddress: null
      }

    }
  },
  created () {
    this.init()
  },
  methods: {
    async init () {
      try {
        await this.getlocations()
        await this.getRestaLists()
        await this.getRestaCounts()

        await this.getcategorys()
      } catch (err) {
        console.log('请重新加载')
      }
    },

    async getRestaLists (limit, offset) {
      try {
        const res = await getRestaList({
          latitude: this.latitude,
          longitude: this.longitude
        }, limit, offset)
        this.tableData = res.map((item) => {
          return {
            name: item.name,
            address: item.address,
            description: item.description,
            category: item.category,
            id: item.id
          }
        })
      } catch (err) {
        throw new Error('获取店铺列表失败')
      }
    },
    async getlocations () {
      try {
        const res = await getlocation()
        this.latitude = res.latitude
        this.longitude = res.longitude
        this.city = res.name
      } catch (err) {
        throw new Error('获取地理位置失败')
      }
    },
    async getRestaCounts () {
      const res = await getRestaCount()
      if (res.status === 1) {
        this.total = res.count
      } else {
        throw new Error('获取店家数量失败')
      }
    },
    async getcategorys () {
      try {
        const res = await getcategory({
          latitude: this.latitude,
          longitude: this.longitude
        })
        res.forEach((item) => {
          const option = {}
          option.value = item.name
          option.label = item.name
          option.children = item.sub_categories.map((item) => {
            return {
              value: item.name,
              label: item.name
            }
          })

          this.options.push(option)
        })
        console.log(this.options)
      } catch (err) {
        throw new Error('店铺分类获取错误')
      }
    },
    async  remoteMethod (params) {
      if (params !== '') {
        this.loading = true
      }
      try {
        const res = await searchAddres(params)
        this.searchAddres = res
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange (e) {
      console.log(e)
      this.getRestaLists(20, e)
    },
    handleadd (index, row) {
      this.$router.push({ path: '/edit', query: { id: row.id } })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteShop(row.id)
        if (res.status === 1) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          this.$message({
            type: 'warning',
            message: res.message
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      if (res.status === 1) {
        this.shopForm.imagepath = res.image_path
      } else {
        this.$message({
          message: '请重新选择图片',
          type: 'warning'
        })
      }
    },
    handleEdit (index, row) {
      this.shopForm.id = row.id
      this.shopForm.name = row.name
      this.shopForm.selectaddress = row.address
      this.shopForm.description = row.description
      this.shopForm.category = row.category.split('/')
      this.contorDialogTable()
    },
    contorDialogTable () {
      this.dialogTableVisible = !this.dialogTableVisible
    },
    async dialogTable () {
      try {
        const res = await postUpdatshop(this.shopForm)
        if (res.status === 1) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
        this.contorDialogTable()
      } catch (err) {
        console.log(err)
      }
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
    background-color: #ccc;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;

  }
  form.el-form.demo-table-expand.el-form--label-left.el-form--inline {
    background-color: #ccc;
    margin: 5px 10px;
}
.contain{
    display: flex;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
