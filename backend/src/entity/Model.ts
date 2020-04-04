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
  stlFile?: string;

  @Column()
  pictureURI?: string;
}
