import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const koa = new Koa();
const router = new Router();

router
  .get('/', (ctx) => {
    ctx.body = {
      data: 'hello world!',
    };
  })
  .post('/register', (ctx) => {
    ctx.body = ctx.request.body;
  })
  .post('/login', (ctx) => {
    ctx.body = ctx.request.body;
  })
  .post('/getObjects', (ctx) => {
    ctx.body = ctx.request.body;
  })
  .post('/getMerchants', (ctx) => {
    ctx.body = ctx.request.body;
  })
  .post('/getMerchantQueue', (ctx) => {
    ctx.body = ctx.request.body;
  })
  .post('/order', (ctx) => {
    ctx.body = ctx.request.body;
  })
  .post('/getOrder', (ctx) => {
    ctx.body = ctx.request.body;
  })

koa
  .use(router.routes())
  .use(router.allowedMethods())
  .use(bodyParser())
  .listen(3000);
