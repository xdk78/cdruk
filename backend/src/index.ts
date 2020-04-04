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

let db: Connection

const koa = new Koa()
koa.keys = [Math.random().toString(32)]

const router = new Router()
koa
  .use(logger())
  .use(bodyParser())
  .use(session({
    secret: process.env.JWT_SECRET || 'ddd',
    getToken: (ctx) => ctx.cookies.get('laravel_session') || ctx.headers.Authorization?.replace('Bearer ')
  })
    .unless({ path: [/^\//, /^\/register\/?$/, /^\/login\/?$/] }))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(cors({ credentials: true }))

koa.context.validate = function validate(value: any, message: string) {
  if (!value) this.throw(400, JSON.stringify({ error: message }))
}

koa.context.getRepo = function getRepo(target: any) {
  return db.getRepository(target)
}

router
  .get('/', (ctx) => {
    ctx.body = {
      data: 'hello world!',
    }
  })
  .post('/register', register)
  .post('/login', login)
  .get('/objects', (ctx) => {
    ctx.body = ctx.request.body
  })
  .get('/getObjects', async (ctx) => {
    let m:any = []
    const repo = db.getRepository(Model)
    let results = await repo.find()
    results.forEach(function(model) {
      m.push({name: model.name, description: model.description, stlFile: model.stlFile, pictureURI: model.pictureURI})
    })
    ctx.message = JSON.stringify(m)
  });

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
