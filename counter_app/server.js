const socket = require('ws')
const wss = new socket.Server({port : 8080})


// create list by querying last week

var admin = require("firebase-admin");
var serviceAccount = require("./occupansee-firebase-adminsdk-cisvj-870d9162db.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://occupansee.firebaseio.com"
});

// Get a database reference to our posts
var db = admin.database();
var ref = db.ref("July 28, 2020/23:00/23:05");
console.log(ref);

function query(path) {
    var ref = db.ref(path);
    ref.once("value").then(function(snapshot) {
         return snapshot.val();
    });
}

// Attach an asynchronous callback to read the data at our posts reference
// snapshot.val holds the data
/*ref.on("value", function(snapshot) {
    //console.log(snapshot.val());
    console.log(averageMinute(snapshot.val()));
    lineNum++;
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});
*/

console.clear();
lineNum = 2;
console.log("Server starting")
console.log(query("July 28, 2020/23:00/23:05"));
average = averageMinute(query("July 28, 2020/23:00/23:05"));
console.log("Average: " + average);
//setInterval(broadcast, 2000)

function noop() {}

function keepAlive(){
    this.isAlive = true;
}

wss.on("connection", ws => {
    ws.on("message", message =>{
        console.log("Recieved Message: '" + message + "'")
        lineNum++; 
    } )
    //ws.send("0000")
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

    if (size == 0) {
        return 0;
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
    if (size == 0) {
        return 0;
    }
    return sum * 1.0 / size;
}

// returns the string representation of today's date
function getToday() {
    var today = new Date();
    return getDate(today);
}

// returns a string representation of the date in the format: Saturday, August 1
function getDate(date) {
    const months = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];

    const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];

    var month_num = date.getMonth();
    var month = months[month_num];
    var day = date.getDay();
    var weekday = daylist[day];
    //var year = date.getFullYear();
    var date = date.getDate();
    return weekday + ", " + month + " " + date;
}

// returns an array of the dates of the last week
function getLastWeek() {
    var result = [];
    for (i = 1; i < 8; i ++) {
        var date = new Date();
        date.setDate(date.getDate() - i);
        result.push(getDate(date));
    }
    return result;
}

//broadcast a number to every websocket in the clients array
function broadcast(){
    randomNum = Math.floor(Math.random() * 8999 + 1000)
    
    process.stdout.cursorTo(0,1);
    process.stdout.clearLine();
    
    var lastweek = getLastWeek(); 
    process.stdout.write("Connections: " + ref + " " + wss.clients.size/2);
    
    process.stdout.cursorTo(0, lineNum);
    wss.clients.forEach(function each(ws) {
        ws.send(randomNum);
    });
}

// set the averages and check if already set, else calculate

function getLastWeekData() {
    const last_weekdays = getLastWeek();
    result = [];
    for (const weekday in last_weekdays) {
        result.push(weekday);




    }
    
}


