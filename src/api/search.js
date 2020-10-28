import request from '@/utils/request.js'

export const getSuggestion = value => {
  return request({
    method: 'get',
    url: '/app/v1_0/suggestion',
    params: {
      q: value
    }
  })
}
export const getSearchResult = obj => {
  return request({
    url: '/app/v1_0/search',
    method: 'get',
    params: obj
  })
}
export const getSearhHistory = () => {
  return request({
    url: '/app/v1_0/search/histories',
    method: 'get'
  })
}
export const deleteSearhHistory = () => {
  return request({
    url: '/app/v1_0/search/histories',
    method: 'DELETE'
  })
}
