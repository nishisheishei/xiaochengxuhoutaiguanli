const localStorage = window.localStorage
const USER_KEY = 'user_info'

// 查看本地存储 获取到本地存储中的数据
export function getUser () {
  return JSON.parse(sessionStorage.getItem(USER_KEY))
}
// 向本地本地存储 存入数据
export function saveUser (data) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(data))
}
// 删除本地存储
export function removeUser () {
  sessionStorage.removeItem(USER_KEY)
}