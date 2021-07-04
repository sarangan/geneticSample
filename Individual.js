const { getRandomArbitrary, getFitness } = require('./utils');

class Individual {
    fitness = 0;
    genes = [];
    geneLength = 5;

    constructor(){
        this.genes = Array.from(Array(this.geneLength));
        this.genes = this.genes.map(gene => getRandomArbitrary(0, 2));
        // console.log('Chromesome ::', this.genes);
        this.fitness = 0;
    }

    calculateFitness(){
         this.fitness = getFitness(this.genes);
        // console.log('Fitness ', this.fitness);
    }
}

module.exports = Individual;
