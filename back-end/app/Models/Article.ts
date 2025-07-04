import { BaseModel, column, belongsTo, BelongsTo, computed } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Piece from './Piece'
import Categorie from './Categorie'
import Etat from './Etat'

export default class Article extends BaseModel {
  public static table = 'article'

  @column({ isPrimary: true })
  public num_inventaire: string

  @column()
  public num_serie: string

  @column()
  public num_bon_commande: string

  @column()
  public fournisseur: string

  @column()
  public marque: string

  @column({ serializeAs: null })
  public categorie: number

  @belongsTo(() => Categorie, {
    foreignKey: 'categorie',
    serializeAs: 'categorie',
  })
  public categorieRelation: BelongsTo<typeof Categorie>

  @column({ serializeAs: null })
  public id_piece: number

  @belongsTo(() => Piece, {
    foreignKey: 'id_piece',
    serializeAs: 'piece',
  })
  public piece: BelongsTo<typeof Piece>

  @column()
  public etat: number

  @belongsTo(() => Etat, {
    foreignKey: 'etat',
    serializeAs: 'etat',
  })
  public etatRelation: BelongsTo<typeof Etat>

  @column.dateTime()
  public date_creation: DateTime

  @column.dateTime()
  public date_modification: DateTime

  @computed()
  public get annee_derniere_modification(): number | null {
    return this.date_modification ? this.date_modification.year : null
  }
}
