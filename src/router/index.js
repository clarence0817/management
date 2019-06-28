import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login.vue';
import home from '../components/home/home.vue';
import users from '../components/useer/users.vue';
import rights from '../components/rights/rights.vue';
import roles from '../components/roles/roles.vue';
import categories from '../components/categories/categories.vue';
import goods from '../components/goods/goods.vue';
import add from '../components/add/add.vue';




Vue.use(Router)
let router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: login },
    {
      path: '/home', name: 'home', component: home, children: [
        { path: '/users', name: 'users', component: users },
        { path: '/rights', name: 'rights', component: rights },
        { path: '/roles', name: 'roles', component: roles },
        { path: '/categories', name: 'categories', component: categories },
        { path: '/goods', name: 'goods', component: goods },
        { path: '/goods/add', name: 'add', component: add }

      ]
    }
  ]
})

router.beforeEach(function (to, from, next) {

  // 判断目标路径是否是 login ，如果是否 Login 直接向后执行
  if (to.name !== 'login') {
    // 获取 token
    let token = window.localStorage.getItem('token')
    // 判断是否存在 
    if (!token) {
      // 跳转到登录页面
      router.push('/login') // 以前的 this 指的是 vue 的实例对象（vue, 组件）
    } else {
      // 如果存在 token 就继续执行
      next()
    }
  } else {
    next()
  }
})
export default router

