import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('../components/login/login.vue');
const home = () => import('../components/home/home.vue');
const users = () => import('../components/useer/users.vue');
const rights = () => import('../components/rights/rights.vue');
const roles = () => import('../components/roles/roles.vue');
const categories = () => import('../components/categories/categories.vue');
const goods = () => import('../components/goods/goods.vue');
const add = () => import('../components/add/add.vue');
const orders = () => import('../components/orders/orders.vue');
const reports = () => import('../components/reports/reports.vue');





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
        { path: '/goods/add', name: 'add', component: add },
        { path: '/orders', name: 'orders', component: orders },
        { path: '/reports', name: 'reports', component: reports },

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

