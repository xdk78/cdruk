import 'reflect-metadata'
import Koa from 'koa'
import logger from 'koa-logger'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import session from 'koa-jwt'
import jwt from 'jsonwebtoken'
import consola from 'consola'
import { Connection, createConnection } from 'typeorm'
import { readJSONSync } from 'fs-extra'
import path from 'path'
import cors from '@koa/cors'
import { User } from './entity/User'
import { hashPassword, generateSalt } from './utils'

let db: Connection

const config = readJSONSync(path.resolve(__dirname, '..', 'config.json'))

// eslint-disable-next-line no-useless-escape
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const koa = new Koa()
koa.keys = [Math.random().toString(32)]

const router = new Router()
koa
  .use(logger())
  .use(bodyParser())
  .use(
    session({
      secret: config.jwtSecret,
      getToken: (ctx) => ctx.cookies.get('laravel_session') || '',
    }).unless({ path: [/^\//, /^\/register\/?$/] })
  )
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors({ origin: true, credentials: true }))

koa.context.validate = function validate(value: any, message: string) {
  if (!value) this.throw(400, JSON.stringify({ error: message }))
}

router
  .get('/', (ctx) => {
    ctx.body = {
      data: 'hello world!',
    }
  })
  .post('/register', async (ctx) => {
    const { body } = ctx.request

    ctx.validate(body.email != null, 'Request body should contain email')
    ctx.validate(typeof body.email === 'string', 'Email should be type string')
    ctx.validate(body.email.trim() !== '', 'Email should not be empty')
    ctx.validate(emailRegex.test(body.email), 'Email should be an email')

    ctx.validate(body.password != null, 'Request body should contain password')
    ctx.validate(
      typeof body.password === 'string',
      'Password should be type string'
    )
    ctx.validate(body.password.trim() !== '', 'Password should not be empty')
    ctx.validate(
      body.password.length > 8,
      'Password should have at least 8 characters'
    )

    const repo = db.getRepository(User)

    const existing = await repo.count({ email: body.email })
    ctx.validate(existing === 0, 'Account already exists')

    const user = new User()
    user.email = body.email
    user.passwordSalt = await generateSalt()
    user.password = await hashPassword(body.password, user.passwordSalt)

    repo.save(user)

    ctx.cookies.set('laravel_session', jwt.sign({ ...user }, config.jwtSecret))
    ctx.body = {
      data: {
        message: 'User created successfully',
      },
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
  .then(() => koa.listen(config.httpPort))
  .then(() => consola.success(`Listening on 0.0.0.0:${config.httpPort}`))
  .catch((err) => {
    consola.error('Failed to start:')
    consola.error(err)
  })
