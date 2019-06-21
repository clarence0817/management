<template>
  <div class="mylogin">
    <div class="mybox">
      <el-form
        :rules="rules"
        label-position="top"
        :model="user"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <h3>用户登录</h3>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="www" type="primary" style="width:100%" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$http({
            method: "POST",
            url: "http://localhost:8888/api/private/v1/login",
            data: this.user
          }).then(res => {
            let { msg, status } = res.data.meta;;
            console.log(res);
            if (status === 200) {
              this.$router.push("/ggg");
              this.$message({
                message: "恭喜你，登录成功",
                type: "success"
              });
            } else {
              this.$message.error("账号密码有误");
            }
          });
        } else {
          this.$message.error(meta.msg);
        }
      });
    }
  }
};
</script>

<style>
.mylogin {
  /* width: 100%;
  height: 100%;
  background-color: #324152; */
  position: relative;
}

.mybox {
  width: 580px;
  height: 440px;
  background-color: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, 50%);
  padding: 40px;
  box-sizing: border-box;
}
</style>
