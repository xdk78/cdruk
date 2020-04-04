import { ExtendableContext } from 'koa'
import { User } from '../entity/User'

export default async function merchants(ctx: ExtendableContext) {
  ctx.body = await ctx.getRepo(User).find({ isMerchant: true })
}
