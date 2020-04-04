import { BaseContext } from 'koa'
import { Session } from 'koa-session'

declare module 'koa' {
  interface BaseContext {
    validate(value: any, message: string): void;
    session: Session
  }
}
