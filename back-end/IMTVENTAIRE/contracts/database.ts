declare module '@ioc:Adonis/Lucid/Database' {
  interface DatabaseConfig {
    /*
    |--------------------------------------------------------------------------
    | Connection
    |--------------------------------------------------------------------------
    |
    | The primary connection for making database queries across the application
    |
    */
    connection: string

    connections: {
      /*
      |--------------------------------------------------------------------------
      | PostgreSQL config
      |--------------------------------------------------------------------------
      |
      | Configuration for PostgreSQL database
      |
      */
      pg: {
        client: 'pg'
        connection: {
          host: string
          port: number
          user: string
          password: string
          database: string
        }
        healthCheck: boolean
        debug: boolean
      }
    }
  }
}
