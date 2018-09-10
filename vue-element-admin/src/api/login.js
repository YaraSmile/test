import request from '@/utils/request'
// const userMap = {
//   admin: {
//     roles: ['admin'],
//     token: 'admin',
//     introduction: '我是超级管理员',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Super Admin'
//   },
//   editor: {
//     roles: ['editor'],
//     token: 'editor',
//     introduction: '我是编辑',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Normal Editor'
//   }
// }

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  // console.log('userName:' + data.username)
  // console.log('password:' + data.password)
  // // const { username1 } = data
  // console.log(userMap[username])
  // return userMap[username]
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  // return 'success'
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  // const { token } = param2Obj(config.url)
  // const token1 = 'admin'
  // console.log('token-mock:' + token)
  // console.log(userMap[token])
  // if (userMap[token1]) {
  //   return userMap[token1]
  // } else {
  //   return false
  // }
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

