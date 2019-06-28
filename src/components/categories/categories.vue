<template>
  <el-card>
    <!-- 导航 -->
    <bar one="商品管理" two="商品分类"></bar>
    <el-button type="success" class="btn" @click="addopen">添加分类</el-button>
    <!-- 列表 -->
    <el-table :data="pagecatlist" border style="width: 100%" v-loading="loading">
      <el-table-tree-column
        file-icon="icon icon-file"
        folder-icon="icon icon-folder"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        prop="cat_name"
        label="分类"
        width="300"
      ></el-table-tree-column>
      <el-table-column prop="cat_level" label="级别" width="300">
        <template
          slot-scope="scope"
        >{{scope.row.cat_level==0?'一级':scope.row.cat_level==1?'二级':'三级'}}</template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效" width="300">
        <template slot-scope="scope">{{scope.row.cat_deleted?'无效':'有效'}}</template>
      </el-table-column>
      <el-table-column width="300" label="操作">
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="curChange"
      :current-page="pagenum"
      :page-size="pagesize"
      :page-sizes="pagesizes"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 新增窗口 -->
    <el-dialog title="添加商品分类" :visible.sync="addbox">
      <el-form>
        <el-form-item label="分类名称" :label-width="LabelWidth">
          <el-input autocomplete="off" v-model="catename"></el-input>
        </el-form-item>
        <!-- 级联选择器 -->
        <el-form-item label="选择分类" :label-width="LabelWidth">
          {{jlvalue}}
          <el-cascader clearable v-model="jlvalue" :options="jiliandata" :props="obj"></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addbox = false">取 消</el-button>
        <el-button type="primary" @click="addlist">确 定</el-button>
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
      // 数据源
      catelist: [],
      // 分页数据源
      pagecatlist: [],
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 5,
      // 页容量选择
      pagesizes: [5, 10, 15],
      // 总条数
      total: 0,
      // 加载窗口
      loading: true,
      // 新增窗口
      addbox: false,
      // 头宽
      LabelWidth: "80px",
      // 级联框数据
      jiliandata: [],
      // 双向绑定数据
      jlvalue: [],
      obj: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id",
        checkStrictly: true
      },
      // 新增输入框双向数据绑定
      catename: ""
    };
  },
  components: {
    bar
  },
  methods: {
    // 获取内容方法
    getconten() {
      this.$http({
        method: "get",
        url: `categories`
      }).then(res => {
        // console.log(res);
        let { data, meta } = res.data;
        if (meta.status == 200) {
          this.catelist = data;
          // 设置加载画面
          setTimeout(() => {
            this.loading = false;
          }, 500);
          this.total = data.length;
          this.getcatlist();
        }
      });
    },
    // 获取分页数据源
    getcatlist() {
      // 开始页
      let begin = this.pagesize * (this.pagenum - 1);
      // 结束页
      let end = this.pagesize * this.pagenum;
      // 截取
      this.pagecatlist = this.catelist.slice(begin, end);
    },
    // 当前页改变时执行
    curChange(currentnum) {
      // 给当前页赋值
      this.pagenum = currentnum;
      // 重新获取
      this.getcatlist();
    },
    // 当页容量改变时改变
    sizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getcatlist();
    },
    // 打开新增窗口并获取级联框数据
    addopen() {
      this.addbox = true;
      this.$http({
        method: "get",
        url: `categories?type=2`
      }).then(res => {
        let { data, meta } = res.data;
        if (meta.status == 200) {
          this.jiliandata = data;
        }
      });
    },
    addlist() {
      // 根据级联框数据获取等级id
      var pid =this.jlvalue.length === 0 ? 0 : this.jlvalue[this.jlvalue.length - 1];
      this.$http({
        method: "post",
        url: `categories`,
        data: {
          cat_pid: pid,
          cat_name: this.catename,
          cat_level: this.jlvalue.length
        }
      }).then(res => {
        console.log(res);
        let { meta } = res.data;
        if (meta.status == 201) {
          this.$message({
            message: meta.msg,
            type: "succcess"
          });
          this.addbox = false;
          this.getconten()
          this.catename=''
        }
      });
    }
  },
  mounted() {
    this.getconten();
  }
};
</script>

<style>
.btn {
  margin-top: 20px;
}
</style>
