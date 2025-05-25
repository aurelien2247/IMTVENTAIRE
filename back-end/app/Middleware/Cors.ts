import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Cors {
  public async handle({ response }: HttpContextContract, next: () => Promise<void>) {
    response.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.header('Access-Control-Allow-Credentials', 'true')

    await next()
  }
} 