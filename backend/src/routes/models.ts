import { ExtendableContext } from 'koa'
import { Model } from '../entity/Model'
import { User } from '../entity/User'

export async function models(ctx: ExtendableContext) {
  ctx.body = await ctx.getRepo(Model).find()
}

export async function addModel(ctx: ExtendableContext) {
  const { body } = ctx.request
  ctx.validate(typeof body.name === 'string', 'Name must be a string!')
  ctx.validate(typeof body.description === 'string', 'Description must be a string!')
  ctx.validate(typeof body.pictureURI === 'string', 'pictureURI must be a string!')

  ctx.validate(body.name.trim() !== '', 'Name must not be empty!')
  ctx.validate(body.description.trim() !== '', 'Description must not be empty!')
  ctx.validate(body.pictureURI.trim() !== '', 'pictureURI must not be empty!')

  const userRepo = ctx.getRepo(User)
  const user = await userRepo.find({ where: { id: ctx.state.user.uid, isMerchant: true }})
  ctx.validate(user.length != 0, 'You are not a merchant!')

  const repo = ctx.getRepo(Model)

  const m = new Model()
  m.name = body.name
  m.description = body.description
  m.pictureURI = body.pictureURI 
  
  await repo.save(m)

  ctx.body = {
  	data: {
  	  status: "success"
  	}
  }
  
}