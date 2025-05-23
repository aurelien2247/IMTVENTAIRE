import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Article extends BaseModel {
  public static table = 'article'

  @column({ isPrimary: true })
  public num_inventaire: string

  @column()
  public categorie: number

  @column()
  public id_piece: number

  @column()
  public num_serie: string

  @column()
  public num_bon_commande: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
