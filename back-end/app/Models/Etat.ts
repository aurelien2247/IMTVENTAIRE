import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Etat extends BaseModel {
  public static table = 'etat'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string
}
