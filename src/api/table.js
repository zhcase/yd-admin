import request from '@/utils/request'

export function getList(params) {
  return request({
    url: 'http://192.168.0.79/dev-api/system/company/list?pageNum=1&pageSize=10',
    method: 'get',
    params
  })
}
