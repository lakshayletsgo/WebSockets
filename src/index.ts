import WebSocket,{WebSocketServer} from "ws";
import http from 'http'
const PORT = 8080
const server = http.createServer(function(request:any, response:any){
    console.log((new Date())+" Recieved request for "+request.url)
    response.end("Kya haal hai bhai ke")
})

const wss = new WebSocketServer({server})

wss.on('connection',function connection(ws){
    ws.on('error',console.error)
    ws.on('message',function message(data,isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary:isBinary})
            }
        })
    })
    ws.send("Main kya Ram Ram ji!")

})
server.listen(PORT,function(){
    console.log((new Date())+"Server is listening on port "+PORT)
})



