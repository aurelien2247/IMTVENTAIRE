import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Piece from './Piece'
import Categorie from './Categorie'
import Etat from './Etat'

export default class Article extends BaseModel {
  public static table = 'article'

  @column({ isPrimary: true })
  public num_inventaire: string

  @column({ serializeAs: null })
  public categorie: number

  @column({ serializeAs: null })
  public id_piece: number

  @column()
  public num_serie: string

  @column()
  public num_bon_commande: string

  @belongsTo(() => Piece, {
    foreignKey: 'id_piece',
    serializeAs: 'piece',
  })
  public piece: BelongsTo<typeof Piece>

  @belongsTo(() => Categorie, {
    foreignKey: 'categorie',
    serializeAs: 'categorie',
  })
  public categorieRelation: BelongsTo<typeof Categorie>

  @column()
  public etat: number

  @belongsTo(() => Etat, {
    foreignKey: 'etat',
    serializeAs: 'etat',
  })
  public etatRelation: BelongsTo<typeof Etat>
}
