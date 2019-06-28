<template>
  <el-card>
    <bar one="商品管理" two="商品列表"></bar>
    <!-- 搜索栏及添加用户按键 -->
    <div style="margin-top: 15px;">
      <el-col :span="4">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-button type="success" round @click="openadd">添加商品</el-button>
      </el-col>
      <!-- <el-col :span="8"></el-col> -->
    </div>
    <!-- 用户列表 -->
    <el-table :data="goodsData" border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="500"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="200"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="200"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="200"></el-table-column>

      <el-table-column label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle></el-button>
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
  </el-card>
</template>

<script>
// 引入面包屑
import bar from "../bar/bar";
export default {
  data() {
    return {
      goodsData: [],
      pagenum: 1,
      pagesize: 5,
      pagesizes: [5, 10, 15],
      total: 0,
      query: ""
    };
  },
  components: {
    bar
  },
  methods: {
    getconten() {
      this.$http({
        method: "get",
        url: `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      }).then(res => {
        // console.log(res);
        let { meta, data } = res.data;
        if (meta.status == 200) {
          this.goodsData = data.goods;
          this.total = data.total;
        }
      });
    },
    // 搜索
    search() {
      this.getconten();
    },
    // 点击翻页
    curChange(pagenum) {
      this.pagenum = pagenum;
      this.getconten();
    },
    // 更改页容量
    sizeChang(pagesize) {
      this.pagesize = pagesize;
      this.getconten();
    },
    openadd(){
      this.$router.push('/goods/add')
    }
  },

  mounted() {
    this.getconten();
  }
};
</script>

<style>
</style>
