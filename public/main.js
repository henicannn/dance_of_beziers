const socket = io.connect("http://localhost:3000");
var bezierFactor;

socket.on('frequency_one', function(frequencyOne) {
    console.log(`Value of Potentiometer 1: ${frequencyOne}`);
    draw(frequencyOne);
});

socket.on('frequency_two', function(frequencyTwo) {
    console.log(`Value of Potentiometer 2: ${frequencyTwo}`);
    draw(frequencyTwo);
});

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(000);
    noLoop();
    bezierFactor = 0;
}

function draw(frequencyOne) {

    // Bezier Settings
    strokeWeight(0.2);
    if (frequencyOne < 550) {
        stroke(frequencyOne * 50, frequencyOne * 0.8, frequencyOne / 0.5);
    } else {
        stroke(frequencyOne * 8, frequencyOne * 8, frequencyOne * 2);
    }
    fill(0, 0, 0, 0);

    var x1 = width * noise(bezierFactor + 15);
    var x2 = width * noise(bezierFactor + 25);
    var x3 = width * noise(bezierFactor + 35);
    var x4 = width * noise(bezierFactor + 45);
    var y1 = height * noise(bezierFactor + 55);
    var y2 = height * noise(bezierFactor + 65);
    var y3 = height * noise(bezierFactor + 75);
    var y4 = height * noise(bezierFactor + 85);

    // Denser Bezier
    for (let frequencyTwo = 0; frequencyTwo < 800; frequencyTwo += 80) {
        bezier(
            x1 - frequencyTwo / 5.0,
            x2 + frequencyTwo,
            x3,
            x4,
            y1,
            y2,
            y3 - frequencyTwo / 20.0,
            y4 + frequencyTwo / 10.0
        );
    }

    // Less Dense Bezier
    bezier(x1, x2, y1, y2, x3, x4, x3, y4);

    bezierFactor += 0.0018;

}

setTimeout(function() {
    location.reload();
}, 15000);