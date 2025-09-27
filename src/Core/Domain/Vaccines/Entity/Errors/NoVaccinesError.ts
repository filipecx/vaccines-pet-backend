export class NoVaccinesError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "No vaccines error"
    }
}