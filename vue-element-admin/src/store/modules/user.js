import { loginByUsername, getSideBarInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    email: '',
    region: '',
    phoneNumber: '',
    token: getToken(),
    tokenSecret: '',
    imgUrl: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    roles: [],
    menus: []
  },

  mutations: {
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_TOKENSECRET: (state, tokenSecret) => {
      state.tokenSecret = tokenSecret
    },
    SET_IMGURL: (state, imgUrl) => {
      state.imgUrl = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    },
    SET_PHONENUMBER: (state, phoneNumber) => {
      state.phoneNumber = phoneNumber
    },
    SET_REGION: (state, region) => {
      state.region = region
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          console.log('登陆成功啦啦啦啦')
          if (response.data.code === 1) {
            const data = response.data.result
            commit('SET_TOKEN', data.token)
            commit('SET_TOKENSECRET', data.tokenSecret)
            commit('SET_EMAIL', data.email)
            commit('SET_ROLES', data.roles)
            commit('SET_REGION', data.region)
            commit('SET_PHONENUMBER', data.phoneNumber)
            // commit('SET_IMGURL', data.imgUrl)
            setToken(data.token)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户对应的侧边栏menu信息
    GetSideBarInfo({ commit }, state) {
      return new Promise((resolve, reject) => {
        getSideBarInfo(state.token, state.tokenSecret).then(response => {
          console.log('res----menu', response)
          if (response.data.code === 1) {
            const data = response.data.result
            if (data && data.length > 0) { // 验证返回的roles是否是一个非空数组
              console.log('result', data)
              commit('SET_MENUS', data)
            } else {
              reject('getSideBarInfo: menus must be a non-null array !')
            }
            resolve(response)
          } else {
            reject('error')
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_TOKENSECRET', '')
        commit('SET_ROLES', [])
        commit('SET_MENUS', [])
        resolve()
      })
    }
  }
}
export default user
