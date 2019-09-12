<template>
  <el-container>
    <el-card class="login-box">
      <div slot="header" class="clearfix">
        <span class="box-header">登录表单</span>
      </div>
      <el-form ref="loginForm" status-icon :rules="rules" :model="form" label-position="left">
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user" clearable v-model="form.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password" show-password autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row :gutter="15">
            <el-col :span="16">
              <el-form-item prop="smsCode">
                <el-input  clearable v-model="form.smsCode" placeholder="请输入验证码">
                  <font-awesome-icon class="el-input__icon" slot="prefix" :icon="['fas' ,'shield-alt']"></font-awesome-icon>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button class="full-button" :disabled="smsBtn" @click="sendSmsCode">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="full-button" type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
  export default {
    name: "Login",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      let validateName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      let validateSmsCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'));
        } else {
          callback();
        }
      };
      return {
        form: {
          name: '',
          password: '',
          smsCode: ''
        },
        rules: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ],
          smsCode: [
            // { required: true, message: '请输入验证码', trigger: 'blur' }
            {validator: validateSmsCode, trigger: 'blur'}
          ]
        },
        smsBtn: false
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      sendSmsCode() {
        this.$refs.loginForm.validateField('name', errorMessage => {
          if (errorMessage !== '') {
            console.log(errorMessage);
          } else {
            this.smsBtn = true;
            console.log('发送验证码...');
          }
        });
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .el-container
    margin-top 150px
    .login-box
      margin 0 auto
      width 400px
      h2
        text-align center
      .form-center
        text-align center
      .full-button
        width 100%
    .clearfix
      text-align center
    .clearfix:before, .clearfix:after
      display table
      content ""
    .clearfix:after
      clear both
  svg.el-input__icon
    width 25px !important
    height 14px
</style>