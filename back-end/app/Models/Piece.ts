import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Piece extends BaseModel {
  public static table = 'piece'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string

  @column()
  public id_etage: number
}
