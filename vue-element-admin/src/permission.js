import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()// start progress bar
  console.log('token::' + getToken())
  if (getToken()) { // determine if there has token
  // /* has token*/
    if (to.path === '/' || to.path === '/login') {
      console.log('login', 'sdfg')
      next()
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      const data = {
        token: store.getters.token,
        tokenSecret: store.getters.tokenSecret
      }
      // { token: store.getters.token, tokenSecret: 'sdfsdf' }
      if (store.getters.addRouters.length === 0) {
        store.dispatch('GetSideBarInfo', data).then(res => { // 拉取sideBar menu info
          console.log('getRes', res)
          const menus = res.data.result
          store.dispatch('GenerateRoutes', { menus }).then(() => {
            router.addRoutes(store.getters.addRouters)
            console.log('router', store.getters.addRouters)
            next()
          })
        }).catch((err) => {
          store.dispatch('LogOut').then(() => {
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    next({ path: '/' })
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
