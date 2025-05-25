import Route from '@ioc:Adonis/Core/Route'
import swagger from '../config/swagger'

Route.get('/swagger', async ({ response }) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>${swagger.options.definition.info.title}</title>
      <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui.css" >
      <style>
        html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
        *, *:before, *:after { box-sizing: inherit; }
        body { margin: 0; background: #fafafa; }
      </style>
    </head>
    <body>
      <div id="swagger-ui"></div>
      <script src="https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.11.0/swagger-ui-bundle.js"> </script>
      <script>
        window.onload = function() {
          window.ui = SwaggerUIBundle({
            url: "/swagger.json",
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
              SwaggerUIBundle.presets.apis
            ],
          })
        }
      </script>
    </body>
    </html>
  `
  return response.type('text/html').send(html)
})

Route.get('/swagger.json', async ({ response }) => {
  return response.json(swagger.options.definition)
}) 