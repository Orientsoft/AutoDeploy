var http = require('http')
var logger = require('util')
const exec = require('child_process').exec

const PORT = 9999
  , PATH = '/home/voyager/romulan-server'

var deployServer = http.createServer(function(request, response) {
  if (request.url.search(/deploy\/?$/i) > 0) {

    var commands = [
      'cd ' + PATH,
      'pkill python',
      'git pull',
      './start.sh'
    ].join(';')
   
    logger.log("exec:[" + commands + "]")
    exec(commands, function(err, out, code) {
      if (err instanceof Error) {
        response.writeHead(500)
        response.end('Server Internal Error.')
        logger.log("Deploy error:" + err.toString())
        throw err
      }

      response.writeHead(200)
      response.end('Deploy Done.')
      logger.log("Deploy Done.")

    })

//    response.writeHead(200)
//    response.end('Deploy Done.')

  } else {

    response.writeHead(404)
    response.end('Not Found.')

  }
})

deployServer.listen(PORT)
logger.log("Webhook server started.")
