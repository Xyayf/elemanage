
/*
*存储数据
*/

export const setItem = (key, value) => {
    if (typeof value === 'object' && value !== null) {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

/**
 * 读取数据
 */
export const getItem = (key) => {
    const value = window.localStorage.getItem(key)
    try {
        return JSON.parse(value)
    } catch (err) {
        return value
    }
}
/**
 * 删除指定数据
 */
export const removeItem = (key) => {
    window.localStorage.removeItem(key)
}
/**
 * 删除所有数据
 */
export const clearItem = () => {
    window.localStorage.clear()
}