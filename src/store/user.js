import { setItem, getItem, clearItem } from '../until/localstoreg'
import router from '../router'
import { getUserInfo, LoginOut } from '../api/api'
import { Message } from 'element-ui'

export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: getItem('userInfo') || null
  },
  mutations: {
    setToke (state, token) {
      state.token = token
      setItem('token', token)
      console.log(state.userInfo)
    },
    setUserIfon (state, userInfo) {
      state.userInfo = userInfo
      setItem('userInfo', userInfo)
    }

  },
  actions: {
    async getUserinfo (context) {
      try {
        const res = await getUserInfo()

        // 将返回的用户信息存入到缓存和store
        context.commit('setUserIfon', res)
      } catch (err) {
        console.log(err)
      }
    },
    async   loginOut (context) {
      try {
        const res = await LoginOut()
        if (res.status === 1) {
          context.commit('setToke', '')
          context.commit('setUserIfon', null)
          clearItem()
          Message({
            message: '退出成功'
          })
          router.push('/login')
        }
      } catch (err) {
        Message({
          message: '退出失败'
        })
      }
    }
  }
}
