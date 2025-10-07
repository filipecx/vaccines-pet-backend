export class InvalidClinicNameError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Invalid clinic name error'
    }
}