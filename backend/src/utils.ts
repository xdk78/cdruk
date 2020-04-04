import jwt from 'jsonwebtoken'
import { User } from './entity/User'

export function jwtSign(user: User) {
  return jwt.sign({ uid: user.id }, process.env.JWT_SECRET || 'ddd')
}

// eslint-disable-next-line no-useless-escape
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/