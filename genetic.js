var betterDistance = Infinity;
var fitness = [];

function calculateFitness(items, population) {
    var currentRecord = Infinity;
    
    for (var i = 0; i < population.length; i++) {
        var d = calcDistance(items, population[i]);

        if (d < betterDistance) {
            betterDistance = d;
            bestOrder = population[i]; // -> global
        }

        if (d < currentRecord) {
            currentRecord = d;
            currentBestOptionForOrder = population[i]; // -> global
        }

        fitness[i] = 1 / (pow(d, 8) + 1);
    }
}

function normalizeFitness() {
    let sum = 0;

    for (var i = 0; i < fitness.length; i++) 
        sum += fitness[i];
        
    for (var i = 0; i < fitness.length; i++) 
        fitness[i] = fitness[i] / sum;
}

function calcDistance(items, order) {
    var sum = 0;

    for (var i = 0; i < order.length - 1; i++) {
        var itemAIndex = order[i];
        var itemA = items[itemAIndex];
        var itemBIndex = order[i + 1];
        var itemB = items[itemBIndex];

        var d = dist(itemA.x, itemA.y, itemB.x, itemB.y);
        sum += d;
    }

    return sum;
}
  
function nextGeneration(population) {
    const result = [];

    for (var i = 0; i < population.length; i++) {
        const orderA = getPortion(population, fitness);
        const orderB = getPortion(population, fitness);
        const order = crossOver(orderA, orderB);
        mutate(order, 0.01);
        result[i] = order;
    }

    return result;
}
  
function getPortion(items, fitness) {
    let index = 0;
    let randomNumber = random(1);
  
    while (randomNumber > 0) {
        randomNumber = randomNumber - fitness[index];
        index++;
    }

    index--;
    
    return items[index].slice();
}
  
function crossOver(itemsA, itemsB) {
    var start = floor(random(itemsA.length));
    var end = floor(random(start + 1, itemsA.length));
    var neworder = itemsA.slice(start, end);
    
    for (let i = 0; i < itemsB.length; i++) {
        var item = itemsB[i];

          if (!neworder.includes(item)) 
            neworder.push(item);
    }
    return neworder;
}

function mutate(items, mutationRate) {
    for (let i = 0; i < items.length; i++) {
        if (random(1) < mutationRate) {
            const indexA = floor(random(items.length));
            const indexB = (indexA + 1) % cities.length;
            swap(items, indexA, indexB);
        }
    }
}

function swap(items, i, j) {
    const temp = items[i];
    items[i] = items[j];
    items[j] = temp;
}