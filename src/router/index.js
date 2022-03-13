import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/page/login/login.vue'
import Home from '@/page/manage/home.vue'
import Manage from '@/page/manage.vue'
import NotFound from '@/page/notfood.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: '登录'
  },
  {
    path: '/',
    component: Manage,
    redirect: '/manage/home',
    name: 'manage',
    meta: '管理',
    children: [
      {
        path: '/manage/home',
        component: Home,
        name: 'home',
        meta: '管理首页'
      },
      {
        path: '/manage/foodlist',
        component: () => import('@/page/manage/foodList.vue'),
        name: '食品列表',
        meta: '食品列表'
      },
      {
        path: '/manage/oderList',
        component: () => import('@/page/manage/oderList.vue'),
        name: '订单列表',
        meta: '订单列表'
      },
      {
        path: '/manage/shopList',
        component: () => import('@/page/manage/shopList.vue'),
        name: '商铺列表',
        meta: '商铺列表'
      },
      {
        path: '/manage/userList',
        component: () => import('@/page/manage/userList.vue'),
        name: '用户列表',
        meta: '用户列表'
      }

    ]

  },
  {
    path: '/add',
    component: Manage,
    redirect: '/add/addfood',
    name: 'add',
    meta: '添加数据',
    children: [
      {
        path: '/add/addfood',
        component: () => import('@/page/add/addfood.vue'),
        name: 'addfood',
        meta: '添加食品'
      },
      {
        path: '/add/addshop',
        component: () => import('@/page/add/addShop.vue'),
        name: 'addshop',
        meta: '添加商铺'
      }

    ]
  },
  {
    path: '/chart',
    component: Manage,
    redirect: '/chart/scattergram',
    name: 'chart',
    meta: '图表',
    children: [
      {
        path: '/chart/scattergram',
        component: () => import('@/page/chart/scattergram.vue'),
        name: 'scattergram',
        meta: '用户分布'
      }

    ]
  },
  {
    path: '/edit',
    component: Manage,
    redirect: '/edit/edit',
    name: 'edit',
    meta: '编辑',
    children: [
      {
        path: '/edit/edit',
        component: () => import('@/page/edit/edit.vue'),
        name: 'editdetail',
        meta: '编辑详情'
      }

    ]
  },
  {
    path: '/explain',
    component: Manage,
    redirect: '/explain/explain',
    name: 'explain',
    meta: '说明',
    children: [
      {
        path: '/explain/explain',
        component: () => import('@/page/explain/explain.vue'),
        name: 'explaindetail',
        meta: '说明'
      }

    ]
  },
  {
    path: '/setting',
    component: Manage,
    redirect: '/setting/setting',
    name: 'setting',
    meta: '设置',
    children: [
      {
        path: '/setting/setting',
        component: () => import('@/page/setting/setting.vue'),
        name: 'settingdetail',
        meta: '管理员设置'
      }

    ]
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }

]

const router = new VueRouter({
  routes
})

export default router
