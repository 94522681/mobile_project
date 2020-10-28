import request from '../utils/request'
export const getPassage = params => {
  return request({
    method: 'Get',
    url: '/app/v1_1/articles',
    params
  })
}
export const getAllChannels = () => {
  return request({
    methods: 'get',
    url: '/app/v1_0/channels'
  })
}
export const addUserChannel = channels => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
export const deleteChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
