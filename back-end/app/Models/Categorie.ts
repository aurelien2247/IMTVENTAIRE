import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Article from './Article'

export default class Categorie extends BaseModel {
  public static table = 'categorie'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @hasMany(() => Article, {
    foreignKey: 'categorie',
  })
  public articles: HasMany<typeof Article>
}
