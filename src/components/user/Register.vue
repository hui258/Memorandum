<template>
  <div class="register">
    <el-form
      label-position="top"
      status-icon
      :rules="rules"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
      :model="registerObj"
    >
      <h2>用户注册</h2>
      <el-form-item label="昵称" prop="name">
        <el-input type="text" v-model="registerObj.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="registerObj.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerObj.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="">
        <el-input type="password" v-model="compwd" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="mybtn" @click.prevent="register">注册</el-button>
      </el-form-item>
      <el-form-item>
        <router-link to="/login">已有账号？点击登录~</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      compwd: '',
      registerObj: {
        username: '',
        password: '',
        name: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur' }
        ],
        compwd: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register () {
      if(this.compwd === this.registerObj.password) {
        this.$http.post('/user', {
          username: this.registerObj.username,
          password: this.registerObj.password,
          name: this.registerObj.name ? this.registerObj.name : '默认昵称'
          })
          .then(res => {
            this.$message({
              type: 'success',
              message: '注册成功,请登录'
            })
            this.$router.push('/login')
          }).catch(err => {
            this.$message({
              type: 'error',
              message: '注册失败'
            })
          })
      } else {
        this.$message({
          type: 'error',
          message: '两次密码不一致'
        })
      }
    }
  }
}
</script>

<style>
.register {
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
