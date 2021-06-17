import cookie from 'js-cookie'

export function getToken(tokenKey: string) {
  return cookie.get(tokenKey)
}

export function setToken(tokenKey: string, token: string) {
  return cookie.set(tokenKey, token)
}

export function removeToken(tokenKey: string) {
  return cookie.remove(tokenKey)
}