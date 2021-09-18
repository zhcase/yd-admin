/*
 * @Author: zeHua
 * @Date: 2021-06-30 09:40:25
 * @LastEditors: zeHua
 * @LastEditTime: 2021-09-18 16:15:18
 * @FilePath: /yd-admin/src/api/user.js
 */
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


export function getTreeList() {
  let data = {
    treeType: 1,
  }
  return request({
    url: 'http://192.168.10.19:8080/system/organization/lazytreeselect',
    method: 'post',
    data
  })
}

export function getUserTree(orgId) {
  return request({
    url: 'http://192.168.10.19:8080/system/organization/findStaff/' + orgId,
    method: 'get'
  })
}

