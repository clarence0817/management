<template>
  <el-card>
    <!-- 步骤条 -->
    <bar one="商品管理" two="商品列表"></bar>
    <el-steps align-center :active="active" finish-status="success" class="margin">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tabs标签 -->
    <el-tabs tab-position="left" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <el-form label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="商品名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            {{valuelist}}
            <el-cascader clearable v-model="valuelist" :options="objlist" :props="propsObj"></el-cascader>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="second">
        <div v-for="(item,index) in manylist" :key="index">
          <div class="mybox">{{item.attr_name}}</div>
          <div>
            <el-checkbox
              border
              v-model="checked"
              v-for="(item1,index1) in item.attr_vals.split(',')"
              :key="index1"
            >{{item1}}</el-checkbox>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="third">
        <el-form label-position="top" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item v-for="(item,index) in onlylist" :key="index" :label="item.attr_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="fourth">
        <el-upload
          class="upload-demo"
          action="http://localhost:8888/api/private/v1/upload"
          :headers="uploadhead"
          list-type="picture"
          :on-success="imgsuccess"
          :on-remove="removeimg"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          {{filelist}}
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="werwe">商品内容</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
// 引入面包屑
import bar from "../bar/bar";
export default {
  data() {
    return {
      // 步骤条默认选中
      active: 0,
      // tabs默认选中
      activeName: "first",
      // 级联双向绑定
      valuelist: [],
      // 级联数据源
      options: [],
      // 级联数据源
      objlist: [],
      // 级联框配置项
      propsObj: {
        label: "cat_name",
        value: "cat_id"
      },
      // 多选框默认状态
      checked: true,
      // 商品参数列表数据
      manylist: [],
      // 商品属性列表数据
      onlylist: [],
      // 上传图片的请求头
      uploadhead: {
        Authorization: window.localStorage.getItem("token")
      },
      // 上传文件列表
      filelist: []
    };
  },
  components: {
    bar
  },
  methods: {
    // 级联与步骤联动
    handleClick(event) {
      this.active = parseInt(event.index);
      if (event.index == "1") {
        this.getcat("many");
      }

      if (event.index == "2") {
        this.getcat("only");
      }
    },
    // 获取级联框数据方法
    getconten() {
      this.$http({
        method: "get",
        url: "categories"
      }).then(res => {
        console.log(res);
        let { data, meta } = res.data;
        if (meta.status == 200) {
          this.objlist = data;
        }
      });
    },
    // 封装获取数据方法
    getcat(sel) {
      if (this.valuelist.length !== 0) {
        this.$http({
          method: "get",
          url: `categories/${
            this.valuelist[this.valuelist.length - 1]
          }/attributes?sel=${sel}`
        }).then(res => {
          console.log(res);
          let { data, meta } = res.data;
          if (sel == "many") {
            this.manylist = data;
          } else {
            this.onlylist = data;
          }
        });
      } else {
        this.$message.error("请选择分类");
      }
    },
    // 保存图片地址
    imgsuccess(response, file, fileList) {
      // response上传图片组件返回的数据
      this.filelist.push(response.data.tmp_path);
    },
    // 删除图片
    removeimg(file, fileList) {
      var img = file.response.data.tmp_path;
      this.filelist.forEach((item, index) => {
        if (item == img) {
          this.filelist.splice(index, 1);
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
.margin {
  margin-top: 20px;
}

label.el-checkbox.is-bordered.is-checked {
  margin-right: 0px;
}

.mybox {
  margin: 20px 0px;
}
</style>
