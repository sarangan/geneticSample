const Individual = require('./Individual');
const { getRandomArbitrary, getFitness } = require('./utils');

const POPULATION_SIZE = 10;
const geneLength = 5;
let generationCount = 0;
let individuals = [];
let fittest;
let secondFittest;
let fittestGenes;
let secondFittestGenes;


function selection(individuals){
    const sortedIndividuals = [...individuals].sort((a , b) => b.fitness - a.fitness );
    // console.log('Sorted ...', sortedIndividuals);
    return [sortedIndividuals[0], sortedIndividuals[1]]
}

function crossover(fittest, secondFittest){
    const crossOverPoint = getRandomArbitrary(0, geneLength);
    const updatedFittest =  [...fittest.slice(0, crossOverPoint), ...secondFittest.slice(crossOverPoint, geneLength)];
    const updatedSecondFittest =  [...secondFittest.slice(0, crossOverPoint), ...fittest.slice(crossOverPoint, geneLength)];
    return [updatedFittest, updatedSecondFittest];
}

function mutation(fittest, secondFittest){
    const updatedFittest = [...fittest];
    const updatedSecondFittest =  [...secondFittest];

    let mutationPoint = getRandomArbitrary(0, geneLength);
    if(updatedFittest[mutationPoint] === 0){
        updatedFittest[mutationPoint] = 1;
    }
    else {
        updatedFittest[mutationPoint] = 0;
    }

    mutationPoint = getRandomArbitrary(0, geneLength);
    if(updatedSecondFittest[mutationPoint] === 0){
        updatedSecondFittest[mutationPoint] = 1;
    }
    else {
        updatedSecondFittest[mutationPoint] = 0;
    }

    return [updatedFittest, updatedSecondFittest];
}

function getLeastFittestIndex(individuals){
    let minFitnessValue = Number.MAX_SAFE_INTEGER;
    let minFitnessIndex = 0;
    [...individuals].forEach((individual, index) => {
        if(minFitnessValue >= individual.fitness){
            minFitnessValue = individual.fitness;
            minFitnessIndex = index;
        }
    });
    console.log('Min Fitness Value ...', minFitnessValue, minFitnessIndex);
   return minFitnessIndex;
}

function addFittestOffspring(individuals, fittest){
    const updatedIndividuals = [...individuals];
    const leastFittestIndex = getLeastFittestIndex(individuals);
    updatedIndividuals[leastFittestIndex].genes = fittest;
    return updatedIndividuals;
}

function getFittestOffspring(fittest, secondFittest){
    if(getFitness(fittest) > getFitness(secondFittest)){
        return fittest;
    }
    return secondFittest;
}

function updatedFitness(individuals){
    individuals.forEach( individual => { individual.calculateFitness()});
}

console.log('Starts...');

console.log('Initialize population...');
individuals = Array.from(Array(POPULATION_SIZE)).map(individual => new Individual());

updatedFitness(individuals)
console.log('Individual after fitness calculation...', individuals);

[fittest, secondFittest] = selection(individuals);

// console.log("Generation: " + generationCount + " Fittest: " + JSON.stringify(fittest) + " Second " + JSON.stringify(secondFittest) );

while(fittest.fitness < 5){
    generationCount += 1;

    [fittest, secondFittest] = selection(individuals);
    console.log('Selection ', fittest.genes, secondFittest.genes);

    [fittestGenes, secondFittestGenes] = crossover(fittest.genes, secondFittest.genes);

    if(getRandomArbitrary(0, 10) < 5 ){
        console.log('Mutation happening...');
        [fittestGenes, secondFittestGenes] = mutation(fittestGenes, secondFittestGenes);
    }

    const fittestAmongFirstAndSecond = getFittestOffspring(fittestGenes, secondFittestGenes);

    individuals = addFittestOffspring(individuals, fittestAmongFirstAndSecond);

    console.log('Calculate fitness of each individual...');
    updatedFitness(individuals);
    // console.log('Updated Individual after calculation fitness...', individuals);

    console.log("Generation: " + generationCount + " Fittest: " + JSON.stringify(fittest) + " Second " + JSON.stringify(secondFittest) );
}

console.log('Found solution...', generationCount , individuals );

console.log('Get fittest solution...', fittest );

console.log('Ends...');
