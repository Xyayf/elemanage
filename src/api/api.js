import request from '@/until/request.js'

/**
 * 登录
 */
export const postLogin = (user) => {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      user_name: user.phone,
      password: user.password
    }
  })
}
/**
 * 退出登录
 */
export const LoginOut = () => {
  return request(
    {
      url: '/admin/singout',
      method: 'get'
    }
  )
}
/**
 * 管理员信息
 */
export const getUserInfo = () => {
  console.log('获取挂历')
  return request({
    url: '/admin/info',
    method: 'get'
  })
}
/**
 * 获取某日API请求量
 * @param {string} date 日期：格式 2017-05-29 必选
 */
export const getOneAPIres = (date) => {
  return request({
    url: `/statis/api/${date}/count`,
    method: 'get'
  })
}
/**
 * 获取所有API请求量
 */
export const getAllAPIres = () => {
  return request({
    url: '/statis/api/count',
    method: 'get'
  })
}
/**
 * 获取某天用户注册量
 * @param {string} date  日期：格式 2017-05-29 必选
 */
export const getOneregiste = (date) => {
  return request({
    url: `/statis/user/${date}/count`,
    method: 'get'
  })
}
/**
 * 获取所有用户注册量
 */
export const getAllregiste = () => {
  return request({
    url: '/v1/users/count',
    method: 'get'
  })
}
/**
 * 获取某天订单数量
 * @param {string} date  日期：格式 2017-05-29 必选
 */
export const getOneOrder = (date) => {
  return request({
    url: `/statis/order/${date}/count`,
    method: 'get'
  })
}
/**
 * 获取所有订单数量
 */
export const getAllOrder = () => {
  return request({
    url: '/bos/orders/count',
    method: 'get'
  })
}
/**
 * 获取管理员列表
 * @param {number} limit 获取数据数量 可选
 * @param {number} offset 获取数据条数 可选
 */
export const getAllAdminList = (limit = 20, offset = 0) => {
  return request({
    url: '/admin/all',
    method: 'get',
    params: {
      limit,
      offset
    }
  })
}
/**
 * 获取管理员数量
 */
export const getAdminCount = () => {
  return request({
    url: '/admin/count',
    method: 'get'
  })
}
/**
 * 获取店铺食品种类
 * @param {number} restaurant_id 餐馆id
 */
export const getShopcategroy = (restaurantid) => {
  return request({
    url: `/shopping/getcategory/${restaurantid}`,
    method: 'get'
  })
}
/**
 * 获取餐馆数量
 */
export const getRestaCount = () => {
  return request({
    url: '/shopping/restaurants/count',
    method: 'get'
  })
}
export const getRestaList = (location, limit = 20, offset = 0) => {
  return request({
    url: '/shopping/restaurants',
    method: 'get',
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      limit,
      offset
    }
  })
}
/**
 * 更新餐馆
 * @param {object} shopDetail 店铺详情
 */
export const postUpdatshop = (shopDetail) => {
  const { id, name, selectaddress, description, phone = '123', imagepath, category } = shopDetail
  console.log(phone)
  return request({
    url: '/shopping/updateshop',
    method: 'post',
    params: {
      id,
      name,
      address: selectaddress,
      description,
      phone,
      image_path: imagepath,
      category
    }
  })
}
/**
 * 删除餐馆
 * @param {number} id 店铺id
 */
export const deleteShop = (id) => {
  return request({
    url: `/shopping/restaurant/${id}`,
    method: 'delete'
  })
}
/**
 * 获取某商铺的食品列表
 * @param {object} shopFood （limit  offset  restaurantid）
 */
export const getfoodList = (restaurantid, limit = 20, offset = 0) => {
  return request({
    url: '/shopping/v2/foods',
    method: 'get',
    params: {
      limit,
      offset,
      restaurant_id: restaurantid
    }
  })
}
/**
 * 获取商品数量
 */
export const getFoodCont = () => {
  return request({
    url: '/shopping/v2/foods/count',
    method: 'get'
  })
}
/**
 * 获取食品种类及详情
 * @param {number} id 食品种类id
 */
export const getFoodKind = (id) => {
  return request({
    url: `/shopping/v2/menu/${id}`,
    method: 'get'
  })
}
/**
 * 更新食品
 * @param {object} foodDetail
 */
export const postUpdateFood = (foodDetail) => {
  const { foodid, foodname, description, foodimgpath, restaid, categoryid, specfoods } = foodDetail
  return request({
    url: '/shopping/v2/updatefood',
    method: 'post',
    params: {
      item_id: foodid,
      name: foodname,
      description,
      image_path: foodimgpath,
      restaurant_id: restaid,
      category_id: categoryid,
      specfoods: specfoods
    }
  })
}
/**
 * 删除食品
 * @param {number} id 食品id
 */
export const deletFood = (id) => {
  return request({
    url: `/shopping/v2/food/${id}`,
    method: 'delete'
  })
}
/**
 * 获取用户列表
 * @param {number} limit
 * @param {number} offset
 * @returns
 */
export const getuserList = (limit = 20, offset = 0) => {
  return request({
    url: '/v1/users/list',
    method: 'get',
    params: {
      limit,
      offset
    }
  })
}
/**
 * 获取订单列表
 * @param {number} limit
 * @param {*} offset
 */
export const getorderList = (limit = 20, offset = 0) => {
  return request({
    url: '/bos/orders',
    method: 'get',
    params: {
      limit,
      offset
    }

  })
}
/**
 * 获取地址信息
 * @param {number} id 地址id
 */
export const getAddress = (id) => {
  return request({
    url: `/v1/addresse${id}`,
    method: 'get'
  })
}
/**
 * 获取用户分布图
 */
export const getuserCitycount = () => {
  return request({
    url: '/v1/user/city/count',
    method: 'get'
  })
}
/**
 * 获取某天管理员注册量
 * @param {string} date
 */
export const getOneAdmincount = (date) => {
  return request({
    url: `/statis/admin/${date}/count`,
    method: 'get'
  })
}
export const uploadImg = (type) => {
  return request({
    url: `v1/addimg/${type}`,
    method: 'post'
  })
}
export const addshop = (shopDetail) => {
  return request({
    url: '',
    method: 'post',
    data: {
      shopDetail
    }
  })
}
export const getlocation = () => {
  return request({
    url: '/v1/cities',
    method: 'get',
    params: {
      type: 'guess'
    }
  })
}
export const getcategory = (location) => {
  return request({
    url: 'shopping/v2/restaurant/category',
    method: 'get',
    params: {
      latitude: location.latitude,
      longitude: location.longitude
    }
  })
}
export const searchAddres = (keyword) => {
  return request({
    url: '/v1/pois',
    method: 'get',
    params: {
      city_id: 14,
      keyword
    }
  })
}
/**
 * 获取商铺详情
 * @param {number} id 商铺id
 * @returns
 */
export const getshopDetail = (id) => {
  return request({
    url: `/shopping/restaurant/${id}`,
    method: 'get'
  })
}
export const getshopFoodList = (id) => {
  return request({
    url: '/shopping/v2/menu',
    method: 'get',
    params: {
      restaurant_id: id
    }
  })
}
export const addFood = (foodDetail) => {
  // eslint-disable-next-line camelcase

  return request({
    url: '/shopping/addfood',
    method: 'post',
    params: foodDetail
  })
}
export const addShop = (shopDetail) => {
  return request({
    url: '/shopping/addshop',
    method: 'post',
    params: shopDetail
  })
}
export const foodCategory = (latitude, longitude) => {
  return request({
    url: '/shopping/v2/restaurant/category',
    method: 'get',
    params: { latitude, longitude }
  })
}
