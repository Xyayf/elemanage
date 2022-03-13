<template>
  <div class="login_page">
    <div class="login_input">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            placeholder="手机号"
            v-model.number="ruleForm.phone"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    <p class="tip">温馨提示：</p>
<p class="tip">未登录过的新用户，自动注册</p>
<p class="tip">注册过的用户可凭账号密码登录</p>
    </div>
  </div>
</template>
<script>
import { postLogin } from '@/api/api.js'
export default {
  data () {
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const regx = /^[1][3,4,5,7,8,9][0-9]{9}$/
        if (!regx.test(value)) {
          return callback(new Error('请输入正确的手机号码'))
        }
        return callback()
      }
    }
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        return callback()
      }
    }

    return {
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }

    }
  },
  methods: {

    async submitForm () {
      try {
        const res = await postLogin(this.ruleForm)

        this.$store.commit('user/setToke', res)
        if (res.status === 1) {
          this.$message('登录成功')
          this.$router.push('/')
          console.log(res)
        } else {
          this.$message(res.message)
        }
      } catch (err) {
        this.$message('重新登录')
      }
    }

  }

}
</script>
<style lang="less" scoped>
.login_page {
  background-color: #337ab7;
  height: 100%;
  position: relative;
  .login_input {
    background-color: #f5f5f5;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 100px 10px 0;
    border-radius: 5px;
    .el-input {
      margin: 10px;
      box-sizing: border-box;
    }
  }
  &/deep/ .el-form-item__label {
    line-height: 60px;
  }
}
.login_page/deep/ .el-input__inner {
  border-radius: 0;
  border: 0;
}
button.el-button.el-button--primary {
  width: 100%;
}
.tip{
    color: red;
    margin:2px 20px;
    font-size: 12px;
}
</style>
