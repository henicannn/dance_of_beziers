const express = require("express");
const app = express();
const http = require("http").createServer(app)
const io = require("socket.io")(http);

app.use(express.static(__dirname + "/public"));

http.listen(3000, function() {
    console.log("http://localhost:3000");
});

const five = require("johnny-five");
const arduino = new five.Board();
let potentiometer_one;
let potentiometer_two;

arduino.on('ready', function() {
    console.log("Arduino is good");
    potentiometer_one = new five.Sensor({
        pin: "A2",

    });

    potentiometer_two = new five.Sensor({
        pin: "A3",
    });


    potentiometer_one.on("data", function() {
        console.log(this.value);
        io.sockets.emit('frequency_one', this.value);
    });

    potentiometer_two.on("data", function() {
        console.log(this.value);
        io.sockets.emit('frequency_two', this.value);
    });
});