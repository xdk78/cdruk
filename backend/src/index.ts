import 'reflect-metadata'
import Koa from 'koa'
import logger from 'koa-logger'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import session from 'koa-jwt'
import cors from '@koa/cors'
import consola from 'consola'
import { Connection, createConnection } from 'typeorm'
import register from './routes/register'
import login from './routes/login'
import { models, addModel } from './routes/models'
import merchants from './routes/merchants'
import profile from './routes/profile'
import verify from './routes/verify'
import { addOrder, getMerchantQueue, getOrderList, setOrderStatus } from './routes/queue';

let db: Connection

const koa = new Koa()
koa.keys = [Math.random().toString(32)]

const router = new Router()
koa
  .use(logger())
  .use(bodyParser())
  .use(session({
    secret: process.env.JWT_SECRET || 'ddd',
    getToken: (ctx) => ctx.headers.authorization?.replace('Bearer ', '')
  })
    .unless({
      path: [
        /^\/$/,
        /^\/register\/?$/,
        /^\/login\/?$/,
        // eslint-disable-next-line no-useless-escape
        /^\/verify\/[a-f0-9\-]*\/$/,
        /^\/merchants\/?$/ // for the sake of demo
      ],
      // @ts-ignore it *should* work: https://github.com/Foxandxss/koa-unless
      method: [
        'OPTIONS'
      ]
    }))
  .use(cors({ origin: '*', credentials: true }))
  .use(router.routes())
  .use(router.allowedMethods())

koa.context.validate = function validate(value: any, message: string) {
  if (!value) this.throw(400, JSON.stringify({ error: message }))
}

koa.context.getRepo = function getRepo(target: any) {
  return db.getRepository(target)
}

router
  .get('/', (ctx) => {
    ctx.body = {
      data: 'hello world!'
    }
  })
  .post('/register', register)
  .post('/login', login)
  .get('/models', models)
  .get('/merchants', merchants)
  .post('/addOrder', addOrder)
  .use('/profile', ...profile())
  .get('/verify/:uuid', verify)
  .get('/getMerchantQueue', getMerchantQueue)
  .get('/getOrderList', getOrderList)
  .post('/setOrderStatus', setOrderStatus)
  .post('/addModel', addModel)

const port = parseInt(process.env.PORT || '3001', 10)

createConnection()
  .then((conn: Connection) => {
    db = conn
  })
  .then(() => koa.listen(port))
  .then(() => consola.success(`Listening on 0.0.0.0:${port}`))
  .catch(err => {
    consola.error('Failed to start:')
    consola.error(err)
  })
