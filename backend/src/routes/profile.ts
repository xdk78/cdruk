import Router from 'koa-router'
import { User } from '../entity/User'

const router = new Router()
  .get('/me', async (ctx) => {
    ctx.body = await ctx.getRepo(User).findOne({
      where: { id: ctx.state.user.uid },
      select: ['id', 'email', 'name', 'location', 'isMerchant'],
    })
  })
  .post('/me', async (ctx) => {
    const repo = ctx.getRepo(User)
    const user = await repo.findOne({
      where: { id: ctx.state.user.uid },
      select: ['id', 'email', 'name', 'location', 'isMerchant'],
    })
    if (!user) return
    const { isMerchant, name, location } = ctx.request.body
    if (typeof isMerchant === 'boolean') user.isMerchant = isMerchant
    if (typeof name === 'string') user.name = name
    if (typeof location === 'string') user.location = location
    await repo.save(user)
    ctx.body = user
  })
  .get('/:id', async (ctx) => {
    ctx.validate(/^[0-9]+$/.test(ctx.params.id), 'User ID must be a number')
    ctx.body = await ctx.getRepo(User).findOne({
      where: { id: ctx.params.id },
      select: ['id', 'email', 'name', 'location', 'isMerchant'],
    })
  })

export default function () {
  return [router.routes(), router.allowedMethods()]
}
