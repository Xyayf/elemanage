<template>
<div class="fooList">
    <div class="input">
        <el-input v-model="inputid" placeholder="请输入店铺id"></el-input>
    </div>
<div class="table">
      <el-table
      :data='tableData'
    style="width: 100%"
    :default-sort = "{prop: 'date', order: 'descending'}"
   @expand-change='expandChange'
   :row-key="row => row.index"
    >
        <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="食品名称">
            <span>{{ props.row.foodname }}</span>
          </el-form-item>
          <el-form-item label="食品id">
            <span>{{ props.row.foodid}}</span>
          </el-form-item>
             <el-form-item label="食品介绍">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="食品评分">
            <span>{{ props.row.rating }}</span>
          </el-form-item>
          <el-form-item label="月销量">
            <span>{{ props.row.monthsales }}</span>
          </el-form-item>
          <el-form-item label="餐馆名称">
            <span>{{ props.row.shopname }}</span>
          </el-form-item>
        <el-form-item label="餐馆id">
            <span>{{ props.row.restaid }}</span>
          </el-form-item>
          <el-form-item label="餐馆地址">
            <span>{{ props.row.shopaddress}}</span>
          </el-form-item>
                    <el-form-item label="食品分类">
            <span>{{ props.row.categoryname}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="foodname"
      label="食品名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="食品介绍"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="rating"
      label="评分">
    </el-table-column>
        <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
<div class="dialog_edit_food">
<!-- 修改食品对话框 -->
    <el-dialog title="修改食品的表单" :visible.sync="dialogEditFoodvisbale">
    <el-form :model="foodEditForm" label-width="80px">
  <el-form-item label="食品名称">
    <el-input v-model="foodEditForm.foodname"></el-input>
  </el-form-item>
  <el-form-item label="食品介绍">
    <el-input v-model="foodEditForm.description"></el-input>
  </el-form-item>
  <el-form-item label="食品分类">
     <el-select v-model="foodEditForm.categoryname" :placeholder="selectplaceholder">
    <el-option
      v-for="(item ) in selectOption"
      :key="item.index"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item>
    <el-form-item label="食品图片">
    <el-upload
  class="avatar-uploader"
  action="/v1/addimg/food"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="foodEditForm.foodimgpath" :src="baseImgurl+foodEditForm.foodimgpath" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
  </el-form-item>
</el-form>
    <el-table
      :data="specfoods"
      style="width: 100%">
      <el-table-column
        prop="specs_name"
        label="规格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="packing_fee"
        label="包装费"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
    </el-table>
     <el-button type="primary" @click="changedialogspec">添加规格</el-button>
       <div slot="footer" class="dialog-footer">
    <el-button @click="dialogEditFoodvisbale= false">取 消</el-button>
    <el-button type="primary" @click="dialogfoodEditConfrim">确 定</el-button>
  </div>
</el-dialog>
<!-- 添加规格对话框 -->
<el-dialog title="添加规格" :visible.sync="dialogspec">
  <el-form :model="specForm">
    <el-form-item label="规格" >
      <el-input v-model="specForm.specs_name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="打包费">
       <el-input v-model="specForm.packing_fee" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="价格">
       <el-input v-model="specForm.price" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogspec = false">取 消</el-button>
    <el-button type="primary" @click="dialogspecConfrim">确 定</el-button>
  </div>
</el-dialog>
</div>
</div>

</template>
<script>
import { getfoodList, getshopDetail, getFoodKind, getshopFoodList, postUpdateFood, deletFood } from '@/api/api.js'
export default {
  data () {
    return {
      tableData: [],
      inputid: '1',
      baseImgurl: '/img/',
      expendRow: [],
      selectplaceholder: '',
      dialogEditFoodvisbale: false, // 修改食品对话框显示和隐藏
      selectOption: [],
      foodEditForm: { // 修改食品的对话的表单
        foodname: '',
        description: '',
        categoryname: '',
        foodimgpath: ''

      },
      dialogspec: false, // 添加规格对话框显示和隐藏
      specForm: { // 添加规格的对话框的表单
        specs_name: '',
        packing_fee: 0,
        price: 20

      },
      specfoods: []
    }
  },
  watch: {
    inputid () {
      this.getfoodLists()
    }
  },
  created () {
    this.getfoodLists()
  },
  methods: {
    // 获取食品列表
    async getfoodLists (limit, offset) {
      const id = parseInt(this.inputid)

      try {
        const res = await getfoodList(id, limit, offset)
        this.tableData = res.map((item, index) => {
          return {
            foodname: item.name,
            foodid: item.item_id,
            foodimgpath: item.image_path,
            monthsales: item.month_sales,
            description: item.description,
            rating: item.rating,
            restaid: item.restaurant_id,
            categoryid: item.category_id,
            specfoods: item.specfoods,
            index: index

          }
        })
      } catch (err) { console.log(err) }
    },

    // 获取商铺详情
    async getshopDetails (id) {
      try {
        const res = await getshopDetail(id)
        return res
      } catch (err) {
        console.log(err)
      }
    },
    // 获取分类详情
    async getcategroyDetail (id) {
      try {
        const res = await getFoodKind(id)
        return res
      } catch (err) {
        console.log(err)
      }
    },
    // 获取某商铺的食品列表
    async getshopFoodLists (id) {
      try {
        const res = await getshopFoodList(id)
        this.selectOption = res.map((item, index) => {
          return {
            value: item.name,
            label: item.name,
            index: index

          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    // 因为商铺详情和分类详情还未来获取
    // id 不明确 当 点击 和展开 时 可以获取明确的
    // 每次点击和展开时 更新tableData/和对话框表单中 选择框中提示文字 和select的option  以及需要从对话框确认时发送请求的数据
    async getDatadetail (row, type) {
      const shopdetail = await this.getshopDetails(row.restaid)
      const categroydetail = await this.getcategroyDetail(row.categoryid)
      const lackdetail = {
        shopaddress: shopdetail.address,
        shopname: shopdetail.name,
        categoryname: categroydetail.name
      }
      this.tableDatadetail = { ...row, ...lackdetail }// 确认时发送请求需要的数据
      this.tableData.splice(row.index, 1, this.tableDatadetail.tableDatadetail)// tableData缺少的
      this.selectplaceholder = categroydetail.name
    },
    // table展开
    expandChange (row, e) {
      if (e.length > 0) {
        this.getDatadetail(row)
      }
    },
    // 编辑按钮
    handleEdit (index, row) {
      if (row) {
        this.getshopFoodLists(row.restaid)
        this.getDatadetail(row)
        this.foodEditForm.foodname = row.foodname
        this.foodEditForm.categoryname = row.categoryname
        this.foodEditForm.foodimgpath = row.foodimgpath
        this.specfoods = row.specfoods
        this.changeEditdialog()
      }
    },
    // 删除商品

    async handleDelete (index, row) {
      try {
        const res = await deletFood(row.foodid)
        if (res.status === 1) {
          this.$message('成功')
        } else {
          this.$message(res.message)
        }
      } catch (err) {
        console.log(err)
      }
    },

    // 关闭打开编辑食品对话框
    changeEditdialog () {
      this.dialogEditFoodvisbale = !this.dialogEditFoodvisbale
    },
    // 修改食品表单确认按钮
    async dialogfoodEditConfrim () {
      try {
        const foodDetail = Object.assign({ ...this.tableDatadetail }, { specfoods: this.specfoods })
        const res = await postUpdateFood(foodDetail)
        if (res.status === 1) {
          this.$message('成功')
        } else {
          this.$message(res.message)
        }
        this.changeEditdialog()
      } catch (err) {
        console.log(err)
      }
    },
    // 关闭打开修改规格对话框
    changedialogspec () {
      this.dialogspec = !this.dialogspec
    },
    // 修改规格对话框的确认按钮
    dialogspecConfrim () {
      this.specfoods.push(this.specForm)
      this.specForm.specs_name = ''
      this.specForm.packing_fee = 0
      this.specForm.price = 20
      this.changedialogspec()
    },
    // 上传图片
    handleAvatarSuccess (res, file) {
      this.foodEditForm.foodimgpath = URL.createObjectURL(file.raw)
      console.log()
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
    }

  }
}
</script>
<style lang="less" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
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
