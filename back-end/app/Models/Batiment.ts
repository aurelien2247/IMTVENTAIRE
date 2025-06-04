import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Etage from './Etage'
import Zone from './Zone'

export default class Batiment extends BaseModel {
  public static table = 'batiment'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @column({ serializeAs: null })
  public id_zone: number

  @belongsTo(() => Zone, {
    foreignKey: 'id_zone',
    serializeAs: 'zone',
  })
  public zone: BelongsTo<typeof Zone>

  @hasMany(() => Etage, {
    foreignKey: 'id_batiment',
  })
  public etages: HasMany<typeof Etage>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
