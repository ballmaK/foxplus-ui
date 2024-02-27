import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/foxplus-app-backend/appStockBase/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/foxplus-app-backend/appStockBase',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/foxplus-app-backend/appStockBase/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/foxplus-app-backend/appStockBase',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/foxplus-app-backend/appStockBase',
    method: 'put',
    data: obj
  })
}

