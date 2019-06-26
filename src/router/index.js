import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login.vue';
import home from '../components/home/home.vue';
import user from '../components/useer/user.vue';
import rights from '../components/rights/rights.vue';
import roles from '../components/roles/roles.vue';


Vue.use(Router)
let router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: login },
    {
      path: '/home', name: 'home', component: home, children: [
        { path: '/user', name: 'user', component: user },
        { path: '/rights', name: 'rights', component: rights },
        { path: '/roles', name: 'roles', component: roles }

      ]
    }
  ]
})

router.beforeEach(function (to, from, next) {

  let token = window.localStorage.getItem('token')

  if (!token) {
    router.push('/login')
  } else {
    next()
  }
})
export default router

