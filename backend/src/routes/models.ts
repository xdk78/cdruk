import { ExtendableContext } from 'koa'
import { Model } from '../entity/Model'

export default async function models(ctx: ExtendableContext) {
  ctx.body = await ctx.getRepo(Model).find()
}
