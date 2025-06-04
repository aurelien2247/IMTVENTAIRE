import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Zone from 'App/Models/Zone'

export default class ZoneController {
  /**
   * List all zones with their buildings
   */
  public async index({ response }: HttpContextContract) {
    try {
      const zones = await Zone.query().preload('batiments')
      return response.ok(zones)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des zones' })
    }
  }
}
