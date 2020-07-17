const socket = require('ws')
const wss = new socket.Server({port : 8080})

//array holding all active connections
var connections = []

console.log("Server starting")
setInterval(broadcast, 5000)

wss.on("connection", ws => {
    ws.on("message", message =>{
        console.log("Recieved Message: '" + message + "'") 
    } )
    ws.send("Hello there")
    connections.push(ws)
})

//broadcast a number to every websocket in the array
function broadcast(){
    randomNum = Math.floor(Math.random() * 8999 + 1000)
    
    for(i = 0 ; i < connections.length; i++){
        connections[i].send(randomNum);
    }
}

