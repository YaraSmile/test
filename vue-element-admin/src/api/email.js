// import request from '@/utils/request'
import axios from 'axios'
import qs from 'qs'
const headers = { 'username': 'lei.gao@oriente.com' }

export function getResult(url, params) {
  return axios.get(url, {
    params: params,
    headers: headers
  })
}
export function postData(url, data) {
  return axios.post(url, qs.stringify(data), { headers: headers })
}
export function deleteData(url, data) {
  return axios.delete(url + `/${data}`, { headers: headers })
}
export function getResult_param(url, data) {
  return axios.get(`${url}/${data}`, { headers: headers })
}
// post 请求数据不能为空，必须要加数据
// export function postData_param(url, data) {
//   return axios.post(`${url}/${data}`, { headers: headers })
// }
