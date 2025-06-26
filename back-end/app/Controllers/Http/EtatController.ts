import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Etat from 'App/Models/Etat'

export default class EtatController {
  /**
   * Get all states
   */
  public async getAll({ response }: HttpContextContract) {
    try {
      const etats = await Etat.query().orderBy('id', 'asc')
      return response.ok(etats)
    } catch (error) {
      return response.internalServerError({ error: 'Erreur lors de la recherche des états' })
    }
  }
}
