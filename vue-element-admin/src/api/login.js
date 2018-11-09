import axios from 'axios'
import qs from 'qs'
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
const headers = { 'username': 'lei.gao@oriente.com' }
export function loginByUsername(username, password) {
  const data = {
    email: username,
    password: password
  }
  const url = '/crm/login'
  return axios.post(url, qs.stringify(data), { headers: headers })
}

export function getSideBarInfo(token, tokenSecret) {
  console.log(token, tokenSecret)
  const data = {
    token: token,
    tokenSecret: tokenSecret
  }
  const url = '/crm/menu'
  return axios.post(url, qs.stringify(data), { header: headers })
}

