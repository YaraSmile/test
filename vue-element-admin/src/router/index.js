import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: submenu only apppear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/authredirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
  // Email Report Start
  // {
  //   path: '/emailReport',
  //   component: Layout,
  //   redirect: '/emailReport/emailList',
  //   name: 'Email Report',
  //   alwaysShow: true,
  //   meta: { title: 'emailReport', icon: 'email' },
  //   children: [
  //     {
  //       path: 'emailList',
  //       component: () => import('@/views/email/EmailReport'),
  //       name: 'Report Biz List',
  //       //  add permission:admin or user
  //       // meta:{roles: ['admin', 'editor']}
  //       meta: { title: 'reportBizList' }
  //     },
  //     {
  //       path: 'emailTableView',
  //       component: () => import('@/views/email/EmailTableView'),
  //       name: 'Email Table View',
  //       meta: { title: 'emailTableView' },
  //       hidden: true
  //     },
  //     {
  //       path: 'emailExcelView',
  //       component: () => import('@/views/email/EmailExcelView'),
  //       name: 'Email Excel View',
  //       meta: { title: 'emailExcelView' },
  //       hidden: true
  //     }
  //   ]
  // }
  // Email Report End
  // Report Detail
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/emailReport',
    component: Layout,
    redirect: '/emailReport/emailList',
    name: 'Email Report',
    alwaysShow: true,
    meta: { title: 'emailReport', icon: 'email' },
    children: [
      {
        path: 'emailList',
        component: () => import('@/views/email/EmailReport'),
        name: 'Report Biz List',
        meta: { title: 'reportBizList' }
      },
      {
        path: 'emailTableView',
        component: () => import('@/views/email/EmailTableView'),
        name: 'Email Table View',
        meta: { title: 'emailTableView' },
        hidden: true
      },
      {
        path: 'emailExcelView',
        component: () => import('@/views/email/EmailExcelView'),
        name: 'Email Excel View',
        meta: { title: 'emailExcelView' },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/overview',
  //   component: Layout,
  //   name: 'Overview',
  //   redirect: 'overview',
  //   children: [
  //     {
  //       path: 'overview',
  //       component: () => import('@/views/overview/map'),
  //       name: 'Overview',
  //       meta: { title: 'overview', icon: 'dashboard', noCache: true }
  //     },
  //     {
  //       path: 'cashaloStatisticsOverview',
  //       component: () => import('@/views/overview/overview'),
  //       name: 'Cashalo Statistics Overview',
  //       meta: { title: 'cashaloStatisticsOverview', icon: 'dashboard', noCache: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/marketing',
  //   component: Layout,
  //   name: 'Marketing',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/marketing/index'),
  //     name: 'Marketing',
  //     meta: { title: 'marketing', icon: 'tab' }
  //   }]
  // },
  // {
  //   path: '/operation',
  //   component: Layout,
  //   name: 'Operation',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/operation/index'),
  //     name: 'Operation',
  //     meta: { title: 'operation', icon: 'tab' }
  //   }]
  // },
  // {
  //   path: '/cubes',
  //   component: Layout,
  //   redirect: 'cubes',
  //   name: 'Cubes',
  //   children: [
  //     {
  //       path: 'loan',
  //       component: () => import('@/views/cubes/loan'),
  //       name: 'Loan',
  //       meta: { title: 'loan', icon: 'dashboard'}
  //     },
  //     {
  //       path: 'userProfile',
  //       component: () => import('@/views/cubes/userProfile'),
  //       name: 'User Profile',
  //       meta: { title: 'userProfile', icon: 'dashboard'}
  //     }
  //   ]
  // },
  // {
  //   path: '/crm',
  //   component: Layout,
  //   name: 'CRM',
  //   children: [{
  //     path: 'index',
  //     component: () => import('@/views/crm/index'),
  //     name: 'CRM',
  //     meta: { title: 'crm', icon: 'tab' }
  //   }]
  // },
  // {
  //   path: '/rule',
  //   component: Layout,
  //   alwaysShow: true,
  //   name: 'Rule',
  //   children: [{
  //     path: 'ruleList',
  //     component: () => import('@/views/rule/ruleList'),
  //     name: 'Rule List',
  //     meta: { title: 'ruleList', icon: 'tab' }
  //   }]
  // },
  /** When your routing table is too long, you can split it into small modules**/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noredirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'errorPages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/errorPage/401'),
  //       name: 'Page401',
  //       meta: { title: 'page401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/errorPage/404'),
  //       name: 'Page404',
  //       meta: { title: 'page404', noCache: true }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/i18n',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/i18n-demo/index'),
  //       name: 'I18n',
  //       meta: { title: 'i18n', icon: 'international' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'externalLink' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
