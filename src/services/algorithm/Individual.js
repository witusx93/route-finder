export default class Individual {

    constructor(dna) {
        this.dna = dna ? dna.slice() : [];
    }

    getFitness() {
        if (!this.distance) {
            this.distance = this.getDistance();
        }
        return 1 / this.distance;
    }

    getDistance() {
        let prev;
        let distance = this.dna.reduce((total, current, index) => {
            if (index === 0) {
                prev = current;
                const last = this.dna[this.dna.length - 1];
                return current.distance(last);
            }
            // console.log(prev.name + "  ---  " + current.name + " ==>   " + current.distance(prev));
            const result = current.distance(prev);
            prev = current;
            return total + result;
        }, 0);
        // console.log(last.name + "  ---  " + first.name + " ==>   " + last.distance(first));
        return distance;
    }

    mutate(probability) {
        const mutatedRoute = this.dna.slice();
        for (let index = 0; index < mutatedRoute.length; index++) {
            if (Math.random() < probability) {

                const randInd = Math.floor(Math.random() * mutatedRoute.length);

                const tempLoc = mutatedRoute[randInd];
                mutatedRoute[randInd] = mutatedRoute[index];
                mutatedRoute[index] = tempLoc;
            }
        }
        return new Individual(mutatedRoute);
    };


    optimize() {
        let bestDistance = this.getDistance();
        let bestRoute = this;
        for (let i = 0; i < this.dna.length - 1; i++) {
            for (let j = i + 1; j < this.dna.length; j++) {
                const newRoute = this.swap2Opt(this.dna, i, j);
                const newDistance = newRoute.getDistance();
                if (newDistance < bestDistance) {
                    bestDistance = newDistance;
                    bestRoute = newRoute;
                }
            }
        }
        return bestRoute;
    }

    swap2Opt(route, i, k) {
        const reversedPart = route.slice(i, k).reverse();
        const tail = route.slice(k);
        const head = route.slice(0, i);
        const result = head.concat(reversedPart).concat(tail);
        return new Individual(result);
    }

    print() {
        const cityNames = this.dna.map((city) => city.name).join(", ");
        const distance = this.getDistance();
        console.log(cityNames + "  ===>  " + distance);
    }

    reorder(city) {
        const startingPos = this.dna.indexOf(city);
        const dna = this.dna.slice(startingPos, this.dna.length).concat(this.dna.slice(0, startingPos));
        return new Individual(dna);
    }
}