import { ExtendableContext } from 'koa'
import { User } from '../entity/User'

export default async function merchants(ctx: ExtendableContext) {
  let m:any = []
  const repo = ctx.getRepo(User)
  let results = await repo.find({where: { isMerchant: true }})
  results.forEach(function(merchant) {
    m.push({id: merchant.id, email: merchant.email, name: merchant.name, location: merchant.location})
  })
  ctx.status = 200
  ctx.message = JSON.stringify(m)
}
