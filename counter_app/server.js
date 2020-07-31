const socket = require('ws')
const wss = new socket.Server({port : 8080})

var admin = require("firebase-admin");
var serviceAccount = require("./occupansee-firebase-adminsdk-cisvj-870d9162db.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://occupansee.firebaseio.com"
});

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("July 28, 2020/23:00/23:05");

// Attach an asynchronous callback to read the data at our posts reference
// snapshot.val holds the data
ref.on("value", function(snapshot) {
    //console.log(snapshot.val());
    console.log(averageMinute(snapshot.val()));
    lineNum++;
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

console.clear();
lineNum = 2;
console.log("Server starting")
setInterval(broadcast, 5000)

function noop() {}

function keepAlive(){
    this.isAlive = true;
}

wss.on("connection", ws => {
    ws.on("message", message =>{
        console.log("Recieved Message: '" + message + "'")
        lineNum++; 
    } )
    ws.send("0000")
    ws.isAlive = true;
    ws.on('pong', keepAlive);
})


//every 10 seconds, ping all connections. If they don't respond terminate them
const interval = setInterval(function ping(){
    wss.clients.forEach(function each(ws){
        if(ws.isAlive == false){
            console.warn("A connection was terminated ungracefully")
            lineNum++;
            return ws.terminate();
        }

        ws.isAlive = false;
        ws.ping(noop)
    });
}, 10000)


function averageMinute(map){
    //assumes "map" holds HH:MM:SS | Count pairs
    sum = 0;
    size = 0;
    
    
    for(const property in map){
        sum += map[property];
        size++;
    }


    return sum * 1.0 / size
}

function averageHour(map){
    //assumes "map" holds the HH:MM | Inner Map pairs
    sum = 0;
    size = 0;

    for(const property in map){
        sum += averageMinute(map[property]);
        size++;
    }

    return sum * 1.0 / size;
}

//broadcast a number to every websocket in the clients array
function broadcast(){
    randomNum = Math.floor(Math.random() * 8999 + 1000)

    process.stdout.cursorTo(0,1);
    process.stdout.clearLine();
    process.stdout.write("Connections: " + wss.clients.size/2);
    process.stdout.cursorTo(0, lineNum);
    wss.clients.forEach(function each(ws) {
        ws.send(randomNum);
    });
}

