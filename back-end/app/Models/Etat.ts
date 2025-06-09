import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Article from './Article'

export default class Etat extends BaseModel {
  public static table = 'etat'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @hasMany(() => Article, {
    foreignKey: 'etat',
  })
  public articles: HasMany<typeof Article>
}
