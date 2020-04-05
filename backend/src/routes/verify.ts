import { ExtendableContext } from 'koa'
import { uuids } from '../mailer'
import { User } from '../entity/User'

export default async function handler(ctx: ExtendableContext) {
  const { uuid } = ctx.params
  ctx.validate(uuid.length === 36, 'Invalid verification token')
  ctx.validate(uuids.has(uuid), 'Invalid verification token')

  const uid = uuids.get(uuid)
  const repo = ctx.getRepo(User)
  const user = await repo.findOne({ id: uid })
  ctx.validate(user != null, 'Invalid verification token')
  if (user == null) return

  user.isVerified = true
  await repo.save(user)
  ctx.redirect('/', 'Redirecting...')
}
