import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import * as https from 'https'
import * as fs from 'fs'

sourceMapSupport.install({ handleUncaughtExceptions: false })

const key = fs.readFileSync(process.env.SSL_KEY || '/app/ssl/server.key')
const cert = fs.readFileSync(process.env.SSL_CERT || '/app/ssl/server.cert')

const ignitor = new Ignitor(__dirname)
const httpServer = ignitor.httpServer()

httpServer.start((server) => {
  return https.createServer({ key, cert }, server).listen(process.env.PORT || 3333, () => {
    console.log('HTTPS server running on port', process.env.PORT || 3333)
  })
})
