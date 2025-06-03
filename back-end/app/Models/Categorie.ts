import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Categorie extends BaseModel {
  public static table = 'categorie'

  @column({ isPrimary: true })
  public id: number

  @column()
  public nom: string
}