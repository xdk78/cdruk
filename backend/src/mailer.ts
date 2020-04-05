import nodemailer, { SentMessageInfo } from 'nodemailer'
import consola from 'consola'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { v4 as uuidv4 } from 'uuid'
import { User } from './entity/User'

export const uuids: Map<string, number> = new Map()

const transporter = nodemailer.createTransport(new SMTPTransport(
  {
    host: process.env.SMTP_SERVER,
    port: 587,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD
    }
  }
))

transporter.verify()
  .then(() => {
    consola.success('Mailer connected successfully')
  })
  .catch(err => {
    consola.error('Mailer failed to connect:')
    consola.error(err)
    consola.info({
      host: process.env.SMTP_SERVER,
      port: 587,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    })
  })

function genUUID(uid: number): string {
  const uuid = uuidv4()

  uuids.set(uuid, uid)

  setTimeout(() => {
    if (uuids.has(uuid)) {
      uuids.delete(uuid)
    }
  }, 3600 * 1000)

  return uuid
}

export function sendRegistrationMail(user: User): Promise<SentMessageInfo> {
  const uuid = genUUID(user.id || 0)

  const link = `${process.env.BASE_URL}/verify/${uuid}/`
  return transporter.sendMail({
    from: process.env.SMTP_USERNAME,
    to: user.email,
    subject: 'cdruk: e-mail verification',
    text: `Hello, ${user.name}\nPlease verify your account by clicking in the link below:\n\n${link}\n\nThe link is valid for 1 hour.`,
    html: `<p>
  Hello, <b>${user.name}</b><br>
  Please verify your account by clicking in the link below:
</p>
<p>
  <a href="${link}">${link}</a>
</p>
<p>The link is valid for 1 hour.</p>`
  })
}

