import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Piece from './Piece'
import Categorie from './Categorie'

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

  @belongsTo(() => Piece, {
    foreignKey: 'id_piece',
  })
  public piece: BelongsTo<typeof Piece>

  @belongsTo(() => Categorie, {
    foreignKey: 'categorie',
    serializeAs: 'categorie',
  })
  public categorieRelation: BelongsTo<typeof Categorie>
}
