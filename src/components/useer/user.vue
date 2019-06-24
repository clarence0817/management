<template>
  <el-card>
    <!-- 面包屑导航 -->
    <bar one="用户管理" two='用户列表'></bar>
    <!-- 搜索栏及添加用户按键 -->
    <div style="margin-top: 15px;">
      <el-col :span="4">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" round @click="opnen">添加用户</el-button>
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
          <el-switch
            @change="btn(scope.row)"
            prop="id"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="opneEdit(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
          <el-button type="success" icon="el-icon-check" circle @click="job(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      background
      @current-change="curChange"
      @size-change="sizeChang"
      :current-page="pagenum"
      :page-sizes="pagesizes"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增用户窗口 -->
    <el-dialog title="新增用户" :visible.sync="book">
      <el-form :model="adduser">
        <el-form-item label="用户名" :label-width="LabelWidth">
          <el-input autocomplete="off" v-model="adduser.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="LabelWidth">
          <el-input autocomplete="off" v-model="adduser.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="LabelWidth">
          <el-input autocomplete="off" v-model="adduser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="LabelWidth">
          <el-input autocomplete="off" v-model="adduser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="book=false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户窗口 -->
    <el-dialog title="新增用户" :visible.sync="box">
      <el-form :model="edituser">
        <el-form-item label="用户名" :label-width="LabelWidth">
          <el-input autocomplete="off" v-model="edituser.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="LabelWidth">
          <el-input autocomplete="off" v-model="edituser.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="LabelWidth">
          <el-input autocomplete="off" v-model="edituser.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="box=false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配用户角色 -->
    <el-dialog title="分配角色" :visible.sync="rolesbox">
      <el-form :model="rolesuseer">
        <el-form-item label="当前用户" :label-width="LabelWidth">
          <el-input autocomplete="off" :disabled="true" v-model="rolesuseer.username"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="LabelWidth">
          <el-select placeholder="请选择角色" v-model="rolesuseer.rid">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="rolesbox = false">取 消</el-button>
        <el-button type="primary" @click="roles">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>
<script>
import bar from '../bar/bar'
export default {
  components:{
    bar
  },
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 15,
      pagesizes: [5, 10, 15],
      total: 0,
      book: false,
      box: false,
      rolesbox: false,
      LabelWidth: "100px",
      adduser: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      edituser: {
        username: "",
        email: "",
        mobile: "",
        id: ""
      },
      rolesuseer: {
        username: "",
        id: "",
        rid: ""
      },
      list: []
    };
  },
  methods: {
    // 获取用户列表方法
    getconten() {
      this.$http({
        method: "get",
        url: `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`,
      }).then(res => {
        //  console.log(res);
        if (res.data.meta.status === 200) {
          this.tableData = res.data.data.users;
          // console.log(res.data.data.users);
          this.total = res.data.data.total;
        }
      });
    },
    // 搜索用户
    search() {
      this.pagenum = 1;
      this.getconten();
    },
    // 点击分页跳转功能
    curChange(currentPage) {
      this.pagenum = currentPage;
      this.getconten();
    },
    // 切换内容显示数量
    sizeChang(pageSize) {
      this.pagesize = pageSize;
      this.getconten();
    },
    // 修改用户状态
    btn(obj) {
      console.log(obj);
      this.$http({
        method: "put",
        url: `users/${obj.id}/state/${obj.mg_state}`,
        
      }).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            message: "设置状态成功",
            type: "success"
          });
        }
      });
    },
    // 打开新增页面
    opnen() {
      this.book = true;
    },
    // 新增用户
    add() {
      this.$http({
        method: "post",
        url: "users",
        data: this.adduser,
        
      }).then(res => {
        let { meta } = res.data;
        if (meta.status === 201) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.getconten();
          this.book = false;
          this.adduser.username = "";
          this.adduser.password = "";
          this.adduser.email = "";
          this.adduser.mobile = "";
        }
      });
    },
    // 打开编辑框获取数据
    opneEdit(id) {
      this.box = true;
      this.$http({
        method: "get",
        url: `users/${id}`,
        
      }).then(res => {
        // console.log(res);
        let { data, meta } = res.data;
        this.edituser.username = data.username;
        this.edituser.email = data.email;
        this.edituser.mobile = data.mobile;
        this.edituser.id = data.id;
      });
    },
    // 保存编辑数据
    edit() {
      this.$http({
        method: "put",
        url: `users/${this.edituser.id}`,
        data: {
          email: this.edituser.email,
          mobile: this.edituser.mobile
        },
        
      }).then(res => {
        // console.log(res);
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.box = false;
          this.getconten();
        }
      });
    },
    // 删除用户数据
    del(id) {
      this.$http({
        method: "delete",
        url: `users/${id}`,
        
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.$confirm("要删除该用户数据吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
          this.pagenum = 1;
          this.getconten();
        }
      });
    },
    // 分配用户角色页面并获取数据
    job(id) {
      this.rolesbox = true;
      this.$http({
        method: "get",
        url: `roles`,
        
      }).then(res => {
        // console.log(res)
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.list = data;
          this.$http({
            method: "get",
            url: `users/${id}`,
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          }).then(res => {
            console.log(res);
            let { data, meta } = res.data;
            if (meta.status === 200) {
              this.rolesuseer.username = data.username;
              this.rolesuseer.id = data.id;
              this.rolesuseer.rid = data.rid;
            }
          });
        }
      });
    },
    // 保存分配角色信息
    roles() {
      this.$http({
        method: "put",
        url: `users/${this.rolesuseer.id}/role`,
        data: this.rolesuser
      }).then(res => {
        // console.log(res);
        let { meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.rolesbox = false;
          this.getconten();
        }
      });
    }
  },
  // 页面打开获取用户列表
  mounted() {
    this.getconten();
  }
};
</script>

<style>
</style>
