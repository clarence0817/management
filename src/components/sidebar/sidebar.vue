<template>
  <el-menu :router='true' :unique-opened="true" class="el-menu-vertical-demo" style="height:100%">
    <!-- 父代 -->
    <el-submenu :index="item.path" v-for="(item,index) in menuslist" :key="index">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.authName}}</span>
      </template>
      <!-- 子代 -->
      <el-menu-item v-for="(item1,index1) in item.children" :key="index1" :index="'/'+item1.path">
        <i class="el-icon-paperclip"></i>
        <span>{{item1.authName}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuslist:[]
    }
  },
  methods: {
    getconten(){
      this.$http({
        method:'get',
        url:'menus'
      }).then(res=>{
        let{data,meta}=res.data   
        if(meta.status==200){
          this.menuslist=data
        }
      })
    }
  },
  mounted() {
    this.getconten()
  },
};
</script>

<style>
</style>
