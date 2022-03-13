import axios from "axios";
import store from "../store";
import { Message } from 'element-ui'
const servies=axios.create({
    baseURL:'',
    timeout:5000,
})

servies.interceptors.request.use(function (config) {
    //统一注入token
    
    if(store.state.user.token){
        // console.log(store.state.user.token)
        // config.headers[Authorization]=store.state.user.token
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  servies.interceptors.response.use(function(res){
    // Message({
    //     message: '请求成功',
    //   })
      return res.data

  },function(err){
    //   处理服务器返回的401错误
      if(err.response&&err.response.data&&err.response.data.code){
          Message({
            message: '登录过时请重新登录',
          })
          store.commit('user/loginOut')
      }
      return Promise.reject(err);
  })
  export default servies