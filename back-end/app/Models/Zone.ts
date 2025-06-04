import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Batiment from './Batiment'

export default class Zone extends BaseModel {
  public static table = 'zone'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @hasMany(() => Batiment, {
    foreignKey: 'id_zone',
    serializeAs: 'batiments',
  })
  public batiments: HasMany<typeof Batiment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
