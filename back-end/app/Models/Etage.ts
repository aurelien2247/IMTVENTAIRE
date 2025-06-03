import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Batiment from './Batiment'
import Piece from './Piece'

export default class Etage extends BaseModel {
  public static table = 'etage'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @column()
  public id_batiment: number

  @belongsTo(() => Batiment, {
    foreignKey: 'id_batiment',
  })
  public batiment: BelongsTo<typeof Batiment>

  @hasMany(() => Piece, {
    foreignKey: 'id_etage',
  })
  public pieces: HasMany<typeof Piece>
}
