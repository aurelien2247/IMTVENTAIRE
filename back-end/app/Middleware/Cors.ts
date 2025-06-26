import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Cors {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://192.168.1.100:5173',
      'http://10.144.193.151:5173',
      'http://198.19.249.3:5173',
      'http://127.0.0.1:5173',
    ]

    const origin = request.header('origin')
    if (origin && allowedOrigins.includes(origin)) {
      response.header('Access-Control-Allow-Origin', origin)
    }

    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.header('Access-Control-Allow-Credentials', 'true')

    await next()
  }
}
