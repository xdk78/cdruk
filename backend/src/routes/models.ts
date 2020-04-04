import { ExtendableContext } from 'koa'
import { Model } from '../entity/Model'

export default async function models(ctx: ExtendableContext) {
  let m:any = []
  const repo = ctx.getRepo(Model)
  let results = await repo.find()
  results.forEach(function(model) {
    m.push({name: model.name, description: model.description, stlFile: model.stlFile, pictureURI: model.pictureURI})
  })
  ctx.status = 200
  ctx.message = JSON.stringify(m)
}
