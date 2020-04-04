import 'reflect-metadata'
import Koa from 'koa'
import logger from 'koa-logger'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import consola from 'consola'
import { Connection, createConnection } from 'typeorm'
import { User } from './entity/User'

let db: Connection

const koa = new Koa()
const router = new Router()
koa
  .use(logger())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())

router
  .get('/', (ctx) => {
    ctx.body = {
      data: 'hello world!'
    }
  })
  .post('/register', (ctx) => {
    const repo = db.getRepository(User)
    // repo.findOne()
    ctx.body = ctx.request.body

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
