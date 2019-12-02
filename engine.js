var cities = new Array(8);
var citiesOrderOptions = new Array(5); // -> order options
var bestOrder; // -> array with the best order to visit cities
var currentBestOptionForOrder; // -> array with the actual order, among the good ones selected

var percentOfPermutationsToTry = 10;
var numberOfPossiblePermutations;
var permutationsCount = 0;

function setup() {
    createCanvas(600, 600);

    var order = [];

    for (let i = 0; i < cities.length; i++) {
        cities[i] = createVector(random(width), random(height / 2)); // -> a point in the canvas
        order[i] = i;
    }

    // -> random order of cities, for genetic algoritm
    for (let i = 0; i < citiesOrderOptions.length; i++) 
        citiesOrderOptions[i] = shuffle(order);

    // -> maximum possibilities using brute force is a factorial of the number of cities
    numberOfPossiblePermutations = ceil(factorial(cities.length) * percentOfPermutationsToTry / 100);
}

function draw() {
    // -> genetic algorithm
    calculateFitness(cities, citiesOrderOptions);
    normalizeFitness();
    citiesOrderOptions = nextGeneration(citiesOrderOptions);
    
    // -> check if it will stop
    permutationsCount++;
    if(permutationsCount == numberOfPossiblePermutations)
        noLoop();

    // -> render/print results
    //frameRate(5);
    background(0);

    // -> text with the percentage of the process
    var percent = 100 * (permutationsCount / numberOfPossiblePermutations);
    textSize(14);
    fill(255);
    noStroke();
    text(nf(percent, 0, 2) + "% completed", 10, 20);

    // -> cities elipses
    fill(255);
    for (var i = 0; i < cities.length; i++) 
        ellipse(cities[i].x, cities[i].y, 8, 8);

    // -> lines for best order
    stroke(255, 0, 255);
    strokeWeight(4);
    noFill();
    beginShape();
    for (var i = 0; i < bestOrder.length; i++) {
        var n = bestOrder[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();

    // -> lines for current order
    translate(0, height / 2);
    stroke(255);
    strokeWeight(1);
    noFill();
    beginShape();
    for (var i = 0; i < currentBestOptionForOrder.length; i++) {
        var n = currentBestOptionForOrder[i];
        vertex(cities[n].x, cities[n].y);
    }
    endShape();
}

function factorial(n) {
    if (n == 1) 
        return 1;

    return n * factorial(n - 1);
}