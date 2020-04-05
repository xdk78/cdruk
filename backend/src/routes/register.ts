import { ExtendableContext } from 'koa'
import bcrypt from 'bcryptjs'
import consola from 'consola'
import { emailRegex, jwtSign } from '../utils'
import { User } from '../entity/User'
import { sendRegistrationMail } from '../mailer'

export default async function handler(ctx: ExtendableContext) {
  const { body } = ctx.request

  ctx.validate(body.email != null, 'Request body should contain email')
  ctx.validate(typeof body.email === 'string', 'Email should be type string')
  ctx.validate(body.email.trim() !== '', 'Email should not be empty')
  ctx.validate(emailRegex.test(body.email), 'Email should be an email')

  ctx.validate(body.password != null, 'Request body should contain password')
  ctx.validate(typeof body.password === 'string', 'Password should be type string')
  ctx.validate(body.password.trim() !== '', 'Password should not be empty')
  ctx.validate(body.password.length >= 8, 'Password should have at least 8 characters')

  ctx.validate(body.name != null, 'Request body must contain name')
  ctx.validate(typeof body.name === 'string', 'Name must be type string')
  ctx.validate(body.name.trim() !== '', 'Name must not be empty')
  
  const repo = ctx.getRepo(User)

  const existing = await repo.count({ email: body.email })
  ctx.validate(existing === 0, 'Account already exists')

  const user = new User()
  user.email = body.email
  user.password = await bcrypt.hash(body.password, await bcrypt.genSalt())
  user.isMerchant = !!body.isMerchant
  user.isVerified = false
  user.name = body.name
  user.location = body.location || ''

  await repo.save(user)

  const token = jwtSign(user)
  ctx.body = {
    data: {
      token
    }
  }
  if (user.email && user.name) {
    sendRegistrationMail(user)
      .then(() => {
        consola.success(`Sent verification email to ${user.email}`)
      })
      .catch(err => {
        consola.error(`Couldn't send verification email to ${user.email}`)
        consola.error(err)
      })
  }
}