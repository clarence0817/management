<template>
  <el-card>
    <!-- 面包屑 -->
    <bar one="权限管理" two="角色列表"></bar>
    <el-button type="primary" class="btn">添加角色</el-button>
    <!-- 列表 -->
    <el-table :data="tableData" border style="width: 100%" class="table">
      <el-table-column type="expand">
        <template slot-scope="scope">
          {{ scope.row.id }}
          <!-- 遍历一级权限 -->
          <el-row v-for="(item1, index1) in scope.row.children" :key="index1">
            <el-col :span="4">
              <!-- 一级权限 -->
              <el-tag
                @close="delRight(scope.row.id, item1.id, scope.row)"
                class="tag1"
                closable
              >{{ item1.authName }} {{ item1.id }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 遍历二级权限 -->
              <el-row v-for="(item2, index2) in item1.children" :key="index2">
                <el-col :span="5">
                  <!-- 二级权限 -->
                  <el-tag
                    @close="delRight(scope.row.id, item2.id, scope.row)"
                    class="tag2"
                    closable
                    type="success"
                  >{{ item2.authName }} {{ item2.id }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="19">
                  <!-- 三级权限 -->
                  <el-tag
                    @close="delRight(scope.row.id, item3.id, scope.row)"
                    class="tag3"
                    v-for="(item3, index3) in item2.children"
                    :key="index3"
                    closable
                    type="danger"
                  >{{ item3.authName }} {{ item3.id }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="500"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="500"></el-table-column>
      <el-table-column label="操作" width="500">
        <el-row>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button type="success" icon="el-icon-check" circle></el-button>
        </el-row>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// 引入面包屑
import bar from "../bar/bar";
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {
    bar
  },
  methods: {
    // 获取列表内容方法
    getconten() {
      this.$http({
        method: "get",
        url: "roles"
      }).then(res => {
        // console.log(res);
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
        }
      });
    },
    // 取消用户权限
    delRight(id, rid, scr) {
      this.$http({
        method: "delete",
        url: `roles/${id}/rights/${rid}`
      }).then(res => {
        console.log(res);

        let { data, meta } = res.data;
        if (meta.status == 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          scr.children = data;
        }
      });
    }
  },

  mounted() {
    // 页面打开获取列表内容
    this.getconten();
  }
};
</script>

<style>
.btn {
  margin-top: 20px;
}
</style>
