import Vue from 'vue'
import Router from 'vue-router'
import { getUser } from '@/utlis/auth'
// import { getCookie } from '@/utlis/cookie'
// import Login from '@/components/Login/index' // 登录页面
// import Setting from '@/components/Login/setting' // 找回密码页面
// import Index from '@/components/layout/index' // 首页
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        // {
        //   name: 'home',
        //   path: '',
        //   component: () => import('@/views/home')
        // },
        {
          name: 'publish',
          // path: '/publish',
          path: '',
          component: () => import('@/views/publish')
        },
        {
          name: 'classify',
          path: '/classify',
          component: () => import('@/views/classify')
        },
        {
          name: 'contacts',
          path: '/contacts',
          component: () => import('@/views/contacts')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    // {
    //   path: '/setting',
    //   name: 'Setting',
    //   component: Setting
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const userInfo = getUser()

  if(to.path !== '/login') {
    if(!userInfo) {
      next({ name: 'login' })
    }else {
      next()
    }
  } else{
    if(!userInfo) {
      next()
    }else {
      window.location.href = '/#/'
    }
  }
  
})


router.afterEach((to, from) => {
  
})


export default router
