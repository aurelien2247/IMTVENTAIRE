import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Batiment from 'App/Models/Batiment'

export default class BatimentController {
  /**
   * List all buildings
   */
  public async index({ response }: HttpContextContract) {
    try {
      const batiment = await Batiment.query().orderBy('nom', 'asc')
      return response.ok(batiment)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des bâtiments' })
    }
  }
}
