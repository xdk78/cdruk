import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  description?: string

  @Column()
  pictureURI?: string
}
