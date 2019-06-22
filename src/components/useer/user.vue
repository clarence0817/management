<template>
  <el-card>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索栏及添加用户按键 -->
    <div style="margin-top: 15px;">
      <el-col :span="4">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" round>添加用户</el-button>
      </el-col>
      <!-- <el-col :span="8"></el-col> -->
    </div>
    <!-- 用户列表 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="380"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="380"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="380"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize:5,
      pagesizes: [5,10,15],
      total:0
    };
  },
  methods: {
    // 获取用户列表方法
    getconten() {
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.query
        }&pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        //  console.log(res);
        if (res.data.meta.status === 200) {
          this.tableData = res.data.data.users;
          this.total=res.data.data.total
        }
      });
    },
    // 搜索用户
    search(){
      this.pagenum=1
      this.getconten()
    }
  },
  mounted() {
    // 页面打开获取用户列表
    this.getconten();
  }
};
</script>

<style>
</style>
