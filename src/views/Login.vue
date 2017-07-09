<!-- <template>
  <el-form :model="ruleForm" :rules="rules2" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="loginin" :loading="logining">登录</el-button>
      <el-button @click.native.prevent="handleReset2">重置</el-button>
    </el-form-item>
  </el-form>
</template> -->
<template>
  <div class="login-body">
    <div class="loginWarp">
      <div class="login-title">
        <img src="../assets/logo4.png"/>
      </div>
     
      <div class="login-form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
       <h3 class="title">系统登录</h3>
        <!-- <el-form ref="form" :model="form" :rules="rules" label-width="0"> -->
          <el-form-item prop="account" class="login-item">
            <el-input v-model="ruleForm.account" placeholder="账户：" class="form-input"></el-input>
          </el-form-item>
          <el-form-item prop="checkPass" class="login-item">
            <el-input type="password" v-model="ruleForm.checkPass" placeholder="密码：" auto-complete="off" class="form-input"></el-input>
          </el-form-item>
          <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
          <br />
          <el-form-item class="login-item">
            <el-button size="large" class="form-submit" @click.native.prevent="loginin" :loading="logining" >登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex'
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        ruleForm: {
          account: 'testAdmin',
          checkPass: 'testAdmin'
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      handleReset() {
        this.ruleForm.checkPass = "";
      },
      loginin(ev) {
        let _this = this;
        this.$refs.ruleForm.validate(async function(valid) {
          if (valid) {
            _this.logining = true;

            let loginParams = { username: _this.ruleForm.account, password: _this.ruleForm.checkPass };
            let data = await _this.login(loginParams).catch(err=>{
              return null
            })
            _this.logining = false;
            if(!data){
              _this.$message({message: "用户名密码错误", type: 'error'});
              return _this.handleReset()
            }
            _this.$router.push({ path: '/applyManager' });
          } else {
            console.log('error submit!!');
            _this.$message({message: "登录失败",type: 'error'});
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" type="text/css">
  .login-body {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/login_bg.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    .loginWarp {
      width: 300px;
      padding: 25px 15px;
      margin: 100px auto;
      background-color: #fff;
      border-radius: 5px;
      .login-title {
        margin-bottom: 25px;
        text-align: center;
      }
      .login-item {
        .el-input__inner {
          margin: 0 !important;
        }
      }
      .form-input {
        input {
          margin-bottom: 15px;
          font-size: 12px;
          height: 40px;
          border: 1px solid #eaeaec;
          background: #eaeaec;
          border-radius: 5px;
          color: #555;
        }
      }
      .form-submit {
        width: 100%;
        color: #fff;
        border-color: #6bc5a4;
        background: #6bc5a4;
        &:active, &:hover {
          border-color: #6bc5a4;
          background: #6bc5a4;
        }
      }
    }
  }
</style>
<!-- <style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }

</style> -->