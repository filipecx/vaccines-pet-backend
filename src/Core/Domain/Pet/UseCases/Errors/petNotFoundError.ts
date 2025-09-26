export class PetNotFoundError extends Error {
    constructor(message: string){
        super(message);
        this.name = 'Pet not found error'
    }
}