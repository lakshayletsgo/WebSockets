"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// First we need to understand that a websocket is at first a http connection only then we upgrade it to websocket connection
// So we need to send a http request to the server to upgrade the connection to websocket
const ws_1 = __importStar(require("ws"));
const http_1 = __importDefault(require("http"));
const PORT = 8080;
// This can different for different servers
// Like in this we are just creating a server and we can also create a express server also.
// To do this we can write this code
// import express from "express"
// const app = express()
// const server = app.listen(PORT)
// In this we can implement any of them main thing is the websocket
const server = http_1.default.createServer(function (request, response) {
    console.log((new Date()) + " Recieved request for " + request.url);
    response.end("Kya haal hai bhai ke");
});
// Now we need to upgrade the connection to websocket
// From Here to 
const wss = new ws_1.WebSocketServer({ server });
wss.on('connection', function connection(ws) {
    // This are all event listener
    // For eg. If there is an error in the websocket it will return 'error' and this below line will run
    ws.on('error', (err) => console.log(err));
    // For any message we sent this logic will run
    // Message from any one client will be forwarded to all the client
    // One client send data to server and then the server broadcast the data to all other clients
    ws.on('message', function message(data, isBinary) {
        // It is just running for each loop so that server can send to all the connected clients
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });
    // This will happen everytime a client connects even if no event has occured
    ws.send("Main kya Ram Ram ji!");
});
// To here the code LOGIC will remain same for all language
server.listen(PORT, function () {
    console.log((new Date()) + "Server is listening on port " + PORT);
});
