function filterRouter(route, menu) {
  let result = null
  if ((route.meta.title === menu.menuName && (route.children && route.children.length<= 1))) {
    return route
  }
  if(route.meta.title === menu.menuName && !route.children){
    return route
  }
  if ((route.meta.title === menu.menuName )&& (menu.menus && menu.menus.length > 0)) {
    result = Object.assign({}, route)
    result.children = []
    for (const subMenu of menu.menus) {
      for (const child of route.children) {
        // let item = null
        if(child.hidden || (child.meta.title ===subMenu.menuName && (child.children && child.children.length<=1) )) {
          // item = child
          result.children.push(child)
        }
        if(!child.hidden && (child.meta.title === subMenu.menuName)){
          result.children.push(child)
        }
        
      }
    }
    return result
  }
}


let menus = [
    {menuName: 'Dashboard', menus:[]},
    {menuName:'Email Report',menus:[{menuName:'Report Biz List'}]}]
let asyncRouterMap = [
  // {
  //   path: '/401',
  //   component: '@/views/errorPage/401',
  //   hidden: true
  // },
  {
    path: '/dashboard',
    component: 'Layout',
    meta: {title:'Dashboard'},
    children: [
      {
        path: '/dashboard',
        component: '@/views/Dashboard/pages/Dashboard',
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {path: '/emailReport',
  component: 'Layout',
  redirect: '/emailReport/emailList',
  name: 'Email Report',
  alwaysShow: true,
  meta: { title: 'Email Report', icon: 'email' },
  children: [
    {
      path: 'emailList',
      component: '@/views/Email/pages/EmailReport',
      name: 'Report Biz List',
      meta: { title: 'Report Biz List' },
      // children: [
      //   {
      //     path: 'emailTableView',
      //     component: '@/views/Email/pages/EmailTableView',
      //     // name: 'Email Table View',
      //     meta: { title: 'EmailTableView' },
      //   },
      //   {
      //     path: 'emailExcelView',
      //     component: '@/views/Email/pages/EmailExcelView',
      //     // name: 'Email Excel View',
      //     meta: { title: 'EmailExcelView' },
      //
      //   }
      // ]
    },
    {
      path: 'emailTableView',
      component: '@/views/Email/pages/EmailTableView',
      // name: 'Email Table View',
      // meta: { title: 'emailTableView' },
      hidden: true
    },
    {
      path: 'emailExcelView',
      component: '@/views/Email/pages/EmailExcelView',
      // name: 'Email Excel View',
      // meta: { title: 'emailExcelView' },
      hidden: true
    }
  ]
}
]

let accessedRouters = []
for (const item of asyncRouterMap) {
  for (const menu of menus) {
    let route = filterRouter(item, menu)
    if(route){
      accessedRouters.push(route)
    }
  }
}
console.log(5555,accessedRouters[1].children)
let s= 'Dashboard Biz'
console.log(s.replace('').replace(/\s*/g,'')