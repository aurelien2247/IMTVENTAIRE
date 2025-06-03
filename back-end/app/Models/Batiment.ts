import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Etage from './Etage'

export default class Batiment extends BaseModel {
  public static table = 'batiment'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @hasMany(() => Etage, {
    foreignKey: 'id_batiment',
  })
  public etages: HasMany<typeof Etage>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
