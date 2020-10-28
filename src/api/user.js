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
