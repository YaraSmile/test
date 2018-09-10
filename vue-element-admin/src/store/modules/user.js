// import { loginByUsername, logout, getUserInfo } from '@/api/login'
// import { setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: 'admin',
    status: '',
    code: '',
    token: 'Admin-Token',
    name: 'Super Admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    introduction: '',
    roles: ['admin'],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      console.log('code:' + code)
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      console.log('token-user:' + token)
      state.token = 'admin'
      // state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      console.log('introduction:' + introduction)
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      console.log('setting:' + setting)
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      console.log('status:' + status)
      state.status = status
    },
    SET_NAME: (state, name) => {
      console.log('name:' + name)
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      console.log('avatar:' + avatar)
      // state.avatar = avatar
      state.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    },
    SET_ROLES: (state, roles) => {
      console.log('roles:' + roles)
      // state.roles = roles
      state.roles = 'admin'
    }
  }
  // actions: {
  //   // 用户名登录
  //   LoginByUsername({ commit }, userInfo) {
  //     const username = userInfo.username.trim()
  //     console.log('username:::' + username)
  //     return new Promise((resolve, reject) => {
  //       loginByUsername(username, userInfo.password).then(response => {
  //         const data = loginByUsername(username, userInfo.password)
  //         console.log('user:' + data.username)
  //         // const data = response.data
  //         console.log(data)
  //         console.log('user:' + data.username)
  //         commit('SET_TOKEN', data.token)
  //         // commit('SET_TOKEN', 'Admin-Token')
  //         setToken(data.token)
  //         // setToken('Admin-Token')
  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },
  //   // 获取用户信息
  //   GetUserInfo({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //       getUserInfo(state.token).then(response => {
  //         if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
  //           // if (response) {
  //           reject('error')
  //         }
  //         const data = response.data
  //         // const data = response
  //         if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
  //           commit('SET_ROLES', data.roles)
  //           commit('SET_ROLES', 'admin')
  //         } else {
  //           reject('getInfo: roles must be a non-null array !')
  //         }
  //         commit('SET_NAME', data.name)
  //         commit('SET_AVATAR', data.avatar)
  //         commit('SET_INTRODUCTION', data.introduction)
  //         resolve(user.admin)
  //       // })
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },
  //   // 第三方验证登录
  //   // LoginByThirdparty({ commit, state }, code) {
  //   //   return new Promise((resolve, reject) => {
  //   //     commit('SET_CODE', code)
  //   //     loginByThirdparty(state.status, state.email, state.code).then(response => {
  //   //       commit('SET_TOKEN', response.data.token)
  //   //       setToken(response.data.token)
  //   //       resolve()
  //   //     }).catch(error => {
  //   //       reject(error)
  //   //     })
  //   //   })
  //   // },
  //
  //   // 登出
  //   LogOut({ commit, state }) {
  //     return new Promise((resolve, reject) => {
  //       logout(state.token).then(() => {
  //         commit('SET_TOKEN', '')
  //         commit('SET_ROLES', [])
  //         removeToken()
  //         resolve()
  //       }).catch(error => {
  //         reject(error)
  //       })
  //     })
  //   },
  //   // 前端 登出
  //   FedLogOut({ commit }) {
  //     return new Promise(resolve => {
  //       commit('SET_TOKEN', '')
  //       removeToken()
  //       resolve()
  //     })
  //   },
  //   // 动态修改权限
  //   ChangeRoles({ commit }, role) {
  //     return new Promise(resolve => {
  //       commit('SET_TOKEN', role)
  //       setToken(role)
  //       getUserInfo(role).then(response => {
  //         const data = response.data
  //         commit('SET_ROLES', data.roles)
  //         commit('SET_NAME', data.name)
  //         commit('SET_AVATAR', data.avatar)
  //         commit('SET_INTRODUCTION', data.introduction)
  //         resolve()
  //       })
  //     })
  //   }
  // }
}
export default user
