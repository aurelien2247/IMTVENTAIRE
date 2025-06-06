import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Article extends BaseModel {
  public static table = 'article'

  @column({ isPrimary: true })
  public num_inventaire: string

  @column()
  public categorie: number

  @column()
  public etat: number

  @column()
  public id_piece: number

  @column()
  public num_serie: string

  @column()
  public num_bon_commande: string

  @column()
  public fournisseur: string

  @column()
  public code_fournisseur: number

  @column()
  public marque: string

}
