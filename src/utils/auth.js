import cookies from 'js-cookie'

const tokenKey = 'Vue_Antd_Template_Token'

export function getToken() {
  return cookies.get(tokenKey)
}

export function setToken(token) {
  return cookies.set(tokenKey, token)
}

export function removeToken() {
  return cookies.remove(tokenKey)
}