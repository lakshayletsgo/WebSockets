// First we need to understand that a websocket is at first a http connection only then we upgrade it to websocket connection
// So we need to send a http request to the server to upgrade the connection to websocket
import WebSocket,{WebSocketServer} from "ws";
import http from 'http'
const PORT = 8080


// This can different for different servers
// Like in this we are just creating a server and we can also create a express server also.
// To do this we can write this code
// import express from "express"
// const app = express()
// const server = app.listen(PORT)

// In this we can implement any of them main thing is the websocket
const server = http.createServer(function(request:any, response:any){
    console.log((new Date())+" Recieved request for "+request.url)
    response.end("Kya haal hai bhai ke")
})


// Now we need to upgrade the connection to websocket

// From Here to 
const wss = new WebSocketServer({server})
wss.on('connection',function connection(ws){
    // This are all event listener
    // For eg. If there is an error in the websocket it will return 'error' and this below line will run
    ws.on('error',(err)=>console.log(err))

    // For any message we sent this logic will run
    // Message from any one client will be forwarded to all the client
    // One client send data to server and then the server broadcast the data to all other clients
    ws.on('message',function message(data,isBinary){
        // It is just running for each loop so that server can send to all the connected clients
        wss.clients.forEach(function each(client){
            if(client.readyState===WebSocket.OPEN){
                client.send(data,{binary:isBinary})
            }
        })
    })

    // This will happen everytime a client connects even if no event has occured
    ws.send("Main kya Ram Ram ji!")

})
// To here the code LOGIC will remain same for all language




server.listen(PORT,function(){
    console.log((new Date())+"Server is listening on port "+PORT)
})



