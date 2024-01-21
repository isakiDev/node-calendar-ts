// token
export interface Token {
  uid: string
  name: string
  iat: number
  exp: number
}

// user
export interface User {
  name?: string
  email: string
  password: string
}

export interface UserTokenData {
  uid: string
  name: string
}

// reva
