import request from '../utils/request'
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const getSmsCode = mobile => {
  return request({
    methods: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
export const getUserList = () => {
  return request({
    methods: 'get',
    url: '/app/v1_0/user'
  })
}
export const addFollow = autId => {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: autId
    }
  })
}
export const deleteFollow = autId => {
  return request({
    method: 'Delete',
    url: `/app/v1_0/user/followings/${autId}`
  })
}

export const collectPassage = artId => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/collections',
    data: {
      target: artId
    }
  })
}
export const deleteCollect = artId => {
  return request({
    method: 'Delete',
    url: `/app/v1_0/article/collections/${artId}`
  })
}

export const toLikeIt = artId => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: {
      target: artId
    }
  })
}
export const deleteLikeIt = artId => {
  return request({
    method: 'Delete',
    url: `/app/v1_0/article/likings/${artId}`
  })
}
