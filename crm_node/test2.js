

const menus = [
  {menuName: 'Dashboard', menus:[]},
  {menuName:'Email Report',menus:[{menuName:'Report Biz List',
      menus:[{menuName:'EmailTableView',menuName:'EmailExcelView'}]}]}]
let asyncRouterMap = [
  // {
  //   //   path: '/401',
  //   //   component: '@/views/errorPage/401',
  //   //   hidden: true
  //   // },
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
      },
      {
        path: 'emailTableView',
        component: '@/views/Email/pages/EmailTableView',
        // name: 'Email Table View',
        meta: { title: 'emailTableView' },
        hidden: true
      },
      {
        path: 'emailExcelView',
        component: '@/views/Email/pages/EmailExcelView',
        // name: 'Email Excel View',
        meta: { title: 'emailExcelView' },
        hidden: true
      }
    ]
  }
]

let accessedRouters = []
  for (const item of asyncRouterMap) {
    for(const menu of menus){
      if(menu.menuName === item.meta.title){
        if(!item.children){
          accessedRouters.push(item)
        }
        if(item.children && item.children.length === 1){
          accessedRouters.push(item)
        }
        if(item.children && item.children.length >1 && menu.menus && menu.menus.length >1) {
          let result = {}
          result = Object.assign({},item)
          result.children = []
          for(const child of item.children){
            for (const subMenu of menu.menus){
              if(child.hidden && subMenu.menuName !== child.meta.title){
               result.children.push(child)
              }
              if(subMenu.menuName === child.meta.title){
                result.children.push(child)
              }
            }
          }
          accessedRouters.push(result)
        }
      }
    }
  }
console.log(5555, accessedRouters)