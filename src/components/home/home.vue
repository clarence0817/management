<template>
  <el-container class="hight">
    <el-header>
      <!-- 头部组件 -->
    <topbar></topbar>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 侧边栏组件 -->
      <sidebar></sidebar>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入头部组件
import topbar from "../topbar/topbar";
// 引入侧边栏组件
import sidebar from '../sidebar/sidebar';
export default {
   components: {
    topbar,
    sidebar,
  },
  mounted() {
    // 验证是否有登录凭证
    let token = window.localStorage.getItem('token')
    if(!token){
      this.$router.push('/login');
      this.$message.error("请先登录账号");
    }
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;

}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  /* text-align: center; */
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.hight {
  height: 100%;
}

.hight h2 {
  margin: 0;
}

.hight a {
  text-decoration: none;
  float: right;
  color: red;
};
</style>
