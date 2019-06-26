<template>
  <el-card>
    <!-- 面包屑 -->
    <bar one="权限管理" two="权限列表"></bar>
    <!-- 列表 -->
    <el-table :data="tableData" border style="width: 100%" class="table">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级" width="180">
        <template slot-scope="scope">
          <!-- 第一种写法 -->
          <!-- {{scope.row.level==="0"?"一级":scope.row.level==='1'?'二级':'三级'}} -->
          <!-- 第二种写法 -->
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// 引入面包屑导航组件
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
        url: "rights/list"
      }).then(res => {
        // console.log(res);
        let { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
          // console.log(this.tableData)
        }
      });
    }
  },
  mounted() {
    // 页面打开获取列表
    this.getconten();
  }
};
</script>

<style>
.table {
  margin-top: 20px;
}
</style>
