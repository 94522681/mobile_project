import request from './../utils/request'
export const addComment = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/comments',
    data
  })
}
export const getPassageComment = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/comments',
    params
  })
}
export const likeComment = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data
  })
}
export const deleteComment = id => {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${id}`
  })
}
