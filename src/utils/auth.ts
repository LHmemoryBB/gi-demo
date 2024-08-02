import Cookies from 'js-cookie'

const port = window.location.port

const isLogin = () => {
  return !!localStorage.getItem('_token')
}
// 获取token
export function getToken(TokenKey: String) {
  return Cookies.get(TokenKey == '_token' ? TokenKey + port : TokenKey)
}

// 将token存储到cookie中
export function setToken(TokenKey: String, token: String) {
  return Cookies.set(TokenKey + port, token)
}

// 移除token
export function removeToken() {
  const cookies = document.cookie.split(';')
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/'
  }
}
