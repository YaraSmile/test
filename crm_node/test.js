function addChildren(parent,item){
  var result = {}
  // parent.children.forEach(item => {
    result.component = `@views/${parent.name}/pages/${item.view}`
    result.path = item.path
    if (item.redirect) {
      result.redirect = item.redirect
    }
    if (item.meta) {
      result.meta = item.meta
    }
    if (item.hidden) {
      result.hidden = item.hidden
    }
    if (item.children && item.children.length > 0) {
      result.children= []
      item.children.forEach(item1 => {
        // var child = {}
        // child.component = `@views/${parent.name}/pages/${item.view}`
        // child.path = item.path
        // if (item.redirect) {
        //   child.redirect = item.redirect
        // }
        // if (item.meta) {
        //   child.meta = item.meta
        // }
        // if (item.hidden) {
        //   child.hidden = item.hidden
        // }
        let temp = addChildren(parent,item1)
        result.children.push(temp)
      })
      
    }

  return result
}
function formate(data) {
  var root = []
  root.component =`@/views/layout/${data.layout}`
  root.path = data.basePath
  if (data.redirect) {
    root.redirect = data.redirect
  }
  if (data.meta) {
    root.meta = data.meta
  }
  if (data.hidden) {
    root.hidden = data.hidden
  }
  if (data.alwaysShow) {
    root.alwaysShow = data.alwaysShow
  }
  // if (data.children.length > 0) {
  //   let tmp = addChildren(data)
  //   root.children = []
  //   root.children.push(tmp)
  // }
  if(data.children.length>0){
    root.children = []
    data.children.forEach(item =>
        // root.children.push(addChildren(data,item))
        root.children.push(addChildren(data,item))
    )
    
  }
  return root
}

const data = [
  {
    name: 'SytemUser',
    basePath: '/user',
    layout: 'User',
    hidden: true,
    children: [
      { path: '/login', hidden: true, view: 'Login' },
      { path: '/forgotPassword', hidden: true, view: 'ForgotPassword' },
      { path: '/resetPassword', hidden: true, view: 'ResetPassword' }
    ]
},
  {
    name: 'Email',
    basePath: '/emailReport',
    layout: 'Layout',
    redirect: '/emailReport/emailList',
    alwaysShow: true,
    meta: { title: 'Email Report', icon: 'email' },
    children: [
      { path: 'emailList', view: 'EmailEport',
        meta: { title: 'Report Biz List' },
        children: [
          { path: '/login111', hidden: true, view: 'Login' },
          { path: '/forgotPassword111', hidden: true, view: 'ForgotPassword' },
          { path: '/resetPassword111', hidden: true, view: 'ResetPassword' }
        ]},
      { path: 'emailTableView', hidden: true, view: 'EmailTableView',
        meta: { title: 'EmailTableView' },
        children: [
          { path: '/login222', hidden: true, view: 'Login' },
          { path: '/forgotPassword222', hidden: true, view: 'ForgotPassword' },
          { path: '/resetPassword222', hidden: true, view: 'ResetPassword' }
        ]},
      { path: 'emailExcelView', hidden: true, view: 'EmailExcelView', meta: { title: 'EmailExcelView' }}
    ]
  }]
  let route = formate(data[0])
console.log(3222222,route.children[0])
// ]
// data.forEach(item=>{
//   let route = formate(item)
//   console.log(route)
//   console.log(11111,route.children)
// })

