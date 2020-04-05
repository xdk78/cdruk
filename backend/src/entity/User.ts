import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  email?: string

  @Column()
  password?: string

  @Column()
  isVerified?: boolean

  @Column()
  isMerchant?: boolean

  @Column()
  name?: string

  @Column()
  location?: string
}
