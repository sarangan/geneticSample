function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function getFitness(genes){
    return genes.reduce((acc, curr) =>  {
        if(curr === 1){
            acc += 1;
        }
        return acc;
    }, 0);
}

module.exports = {
    getRandomArbitrary,
    getFitness
}
