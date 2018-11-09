// import constantRouterMap from '@/router/index'
const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  imgUrl: state => state.user.imgUrl,
  email: state => state.user.email,
  tokenSecret: state => state.user.tokenSecret,
  region: state => state.user.region,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  phoneNumber: state => state.user.phoneNumber,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs
}
export default getters
