import { ExtendableContext } from 'koa'
import bcrypt from 'bcryptjs'
import { User } from '../entity/User'
import { jwtSign } from '../utils'

export default async function login(ctx: ExtendableContext) {
  const { body } = ctx.request

  ctx.validate(body.email != null, 'Request body should contain email')
  ctx.validate(typeof body.email === 'string', 'Email should be type string')

  ctx.validate(body.password != null, 'Request body should contain password')
  ctx.validate(typeof body.password === 'string', 'Password should be type string')

  const repo = ctx.getRepo(User)

  const user = await repo.findOne({ email: body.email })

  ctx.validate(user, 'Invalid username or password')
  if (user == null || user.password == null) return

  ctx.validate(user.email === body.email, 'Invalid username or password')
  ctx.validate(await bcrypt.compare(body.password, user.password), 'Invalid username or password')

  const token = jwtSign(user)
  ctx.body = {
    data: {
      token
    }
  }
}
