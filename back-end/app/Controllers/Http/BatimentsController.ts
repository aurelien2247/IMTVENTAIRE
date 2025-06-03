import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Batiment from 'App/Models/Batiment'

export default class BatimentsController {
  /**
   * List all buildings
   */
  public async index({ response }: HttpContextContract) {
    try {
      const batiment = await Batiment.all()
      return response.ok(batiment)
    } catch (error) {
      return response.internalServerError({ error: error.message })
    }
  }
}
