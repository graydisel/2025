export class Block {
    apartments = [];
    constructor(maxApartments) {
        this.maxApartments = maxApartments;
    }
    #number = 0;
    addApartment(number) {
        if (this.#number < this.maxApartments) {
            this.apartments.push(number);
            this.#number++;
        }
        else {
            console.log('Sorry, you reached maximum amount of apartments');
        }
    }
}