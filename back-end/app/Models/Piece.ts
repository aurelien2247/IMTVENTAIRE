import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Etage from './Etage'
import Article from './Article'

export default class Piece extends BaseModel {
  public static table = 'piece'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @column({ serializeAs: null })
  public id_etage: number

  @belongsTo(() => Etage, {
    foreignKey: 'id_etage',
    serializeAs: 'etage',
  })
  public etage: BelongsTo<typeof Etage>

  @hasMany(() => Article, {
    foreignKey: 'id_piece',
    serializeAs: 'articles',
  })
  public articles: HasMany<typeof Article>
}
