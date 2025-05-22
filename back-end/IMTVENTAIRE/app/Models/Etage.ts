import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Etage extends BaseModel {
    public static table = 'etage'

    @column({ isPrimary: true })
    public id: number

    @column()
    public nom: string

    @column()
    public id_batiment: number
}
