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
        <el-row slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            @click="openlist(scope.row.children,scope.row.id)"
          ></el-button>
        </el-row>
      </el-table-column>
    </el-table>

    <!-- 分配权限窗口 -->
    <el-dialog title="分配权限" :visible.sync="fp">
      <div slot="footer" class="dialog-footer">
        <!-- 树形控件 -->
        <!-- data: 数据源 -->
        <!-- props: 当前 tree 的配置项  -->
        <!-- node-key：给当前树状结构设置唯一标签 -->
        <!-- default-checked-keys: 不能单独使用，配置 node-Key 使用 -->
        <!-- default-expand-all: 是否默认展开所有节点 -->
        <el-tree
          :default-checked-keys="arr"
          :default-expand-all="true"
          :data="treelist"
          :props="obj"
          node-key="id"
          show-checkbox
          ref="mychex"
        ></el-tree>
        <el-button @click="fp = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 引入面包屑
import bar from "../bar/bar";
export default {
  data() {
    return {
      tableData: [],
      fp: false,
      treelist: [],
      // 默认选中数组
      arr: [],
      // 配置项
      obj: {
        label: "authName",
        children: "children"
      },
      itemid: ""
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
    },
    // 打开分配选项窗口并获取数据
    openlist(sonid, id) {
      // 打开前清空上次打开内容
      this.arr = [];
      this.$http({
        method: "get",
        url: "rights/tree"
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status == 200) {
          // 保存id
          this.itemid = id;

          this.treelist = data;
          // 遍历获取第三级权限的id
          sonid.forEach(item1 => {
            item1.children.forEach(item2 => {
              item2.children.forEach(item3 => {
                this.arr.push(item3.id);
              });
            });
          });
        }
      });
      this.fp = true;
    },
    // 选中项提交保存
    add() {
      // 获取全选
      let onekey = this.$refs.mychex.getCheckedKeys();
      // 获取半选
      let twokey = this.$refs.mychex.getHalfCheckedKeys();
      // 拼接数据
      let rid = [...onekey, ...twokey];

      this.$http({
        method: "post",
        url: `roles/${this.itemid}/rights`,
        data: {
          rids: rid.join(",")
        }
      }).then(res => {
        // console.log(res);
        let { data, meta } = res.data;
        if (meta.status == 200) {
          this.$message({
            message: meta.msg,
            type: "success"
          });
          this.fp = false;
          this.getconten();
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
