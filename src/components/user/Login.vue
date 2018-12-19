<template>
  <div class="login">
    <el-form
      label-position="top"
      status-icon
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
      :model="loginObj"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input type="text" v-model="loginObj.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginObj.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="mybtn" @click.prevent="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/register">没有账号？请点击注册~</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginObj: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (this.loginObj.username === '' || this.loginObj.password === '') {
        this.$message({
            type: 'error',
            message: '用户名或密码不能为空'
          }) 
          return
      }
      this.$http.post('/auth', this.loginObj)
        .then(res => {
          window.localStorage.setItem('token', res.data.token)
          this.$router.push('/index')
        }).catch(err => {
          this.$message({
            type: 'error',
            message: '用户名或密码错误'
          })
        })
    }
  }
}
</script>

<style>
.login {
  background-color: #324152;
  height: 100%;
  position: relative;
}

.el-form {
  background-color: #fff;
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
}

.mybtn {
  width: 100%;
}
</style>
