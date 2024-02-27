import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/foxplus-app-backend/appUser/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/foxplus-app-backend/appUser',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/foxplus-app-backend/appUser/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/foxplus-app-backend/appUser',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/foxplus-app-backend/appUser',
    method: 'put',
    data: obj
  })
}

