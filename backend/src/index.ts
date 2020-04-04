import 'reflect-metadata'
import Koa from 'koa'
import logger from 'koa-logger'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import consola from 'consola'
import { Connection, createConnection } from 'typeorm'
import { User } from './entity/User'

let db: Connection

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const koa = new Koa()
koa.keys = [ Math.random().toString(32) ]

const router = new Router()
koa
  .use(logger())
  .use(bodyParser())
  .use(session({ key: 'PHPSESSID' }, koa))
  .use(router.routes())
  .use(router.allowedMethods())

koa.context.validate = function validate (value: any, message: string) {
  if (!value) this.throw(400, JSON.stringify({ error: message }))
}

router
  .get('/', (ctx) => {
    ctx.body = {
      data: 'hello world!'
    }
  })
  .post('/register', (ctx) => {
    const { body } = ctx.request

    ctx.validate(body.email != null, 'Request body should contain email')
    ctx.validate(typeof body.email === 'string', 'Email should be type string')
    ctx.validate(body.email.trim() !== '', 'Email should not be empty')
    ctx.validate(emailRegex.test(body.email), 'Email should be an email')

    ctx.validate(body.password != null, 'Request body should contain password')
    ctx.validate(typeof body.password === 'string', 'Password should be type string')
    ctx.validate(body.password.trim() !== '', 'Password should not be empty')

    const repo = db.getRepository(User)

    const existing = repo.findOne({ email: body.email })
    ctx.validate(existing != null, 'Account already exists')

    const user = new User()
    user.email = body.email
    user.password = body.password

    ctx.session.user = user
    ctx.body = {
      data: {
        message: 'User created successfully'
      }
    }
  })
  .post('/login', (ctx) => {
    ctx.body = ctx.request.body
  })
  .post('/getObjects', (ctx) => {
    ctx.body = ctx.request.body
  })
  .post('/getMerchants', (ctx) => {
    ctx.body = ctx.request.body
  })
  .post('/getMerchantQueue', (ctx) => {
    ctx.body = ctx.request.body
  })
  .post('/order', (ctx) => {
    ctx.body = ctx.request.body
  })
  .post('/getOrder', (ctx) => {
    ctx.body = ctx.request.body
  })

createConnection()
  .then((conn: Connection) => {
    db = conn
  })
  .then(() => koa.listen(3000))
  .then(() => consola.success('Listening on 0.0.0.0:3000'))
  .catch(err => {
    consola.error('Failed to start:')
    consola.error(err)
  })
