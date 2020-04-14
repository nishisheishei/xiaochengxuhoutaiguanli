<template>
  <div class="login-wrap">
    <div class="box-leiming">
      <div class="login-padding">
        <h3>视界王国小程序后台管理系统</h3>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input class="input-prop" v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="input-prop" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="checked">
          <el-checkbox v-model="ruleForm.checked"></el-checkbox>
          <span class="agree-text">我已阅读并同意<a href="#" style="color:#3296fa">用户协议</a>和<a href="#" style="color:#3296fa">隐私条款</a></span>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" class="login-button" :loading="loading" @click="submitLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { saveUser } from '@/utlis/auth'
// import { setCookie } from '@/utlis/cookie'
import { loginClickData } from '@/api/home'
export default {
  data() {
    return {
      // hidden: false,
      loading: false,
      ruleForm: {
        userName: '',
        password: '',
        checked: ''
      },
      rules: {
        userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          checked: [
          { required: true, message: '请同意用户协议' },
          { pattern: /true/, message: '请同意用户协议' }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    async submitLogin () {
      this.loading = true
      let query = {
        userName: this.ruleForm.userName,
        passWord: this.ruleForm.password
      }
      try {
        const { data } = await loginClickData(query)
        // console.log(data)
        if(data.code == 200) {
          saveUser(data.data)
          this.$router.push({ path : '/' })
        } else {
          this.$message.error('用户名或密码错误')
        }
      } catch (err) {
        this.$message.error('登录失败，用户名或密码错误')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  background: url('./login_bg.jpg') no-repeat;
  background-size: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  .box-leiming {
    padding: 20px;
    width: 450px;
    height: 350px;
    background: #fff;
    border-radius: 10px;
  }

  .login-padding {
    padding-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-button {
    width: 100%;
  }

  .agree-text {
    padding-left: 30px;
  }
  
}
</style>
