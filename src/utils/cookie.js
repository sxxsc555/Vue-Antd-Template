import cookie from 'js-cookie'

export function getToken(tokenKey) {
  return cookie.get(tokenKey)
}

export function setToken(tokenKey, token) {
  return cookie.set(tokenKey, token)
}

export function removeToken(tokenKey) {
  return cookie.remove(tokenKey)
}