import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login/login.vue';
import home from '../components/home/home.vue';
import user from '../components/useer/user.vue';


Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', name: 'login', component: login },
    {
      path: '/home', name: 'home', component: home, children: [
        { path: '/user', name: 'user', component: user }
      ]
    }
  ]
})
