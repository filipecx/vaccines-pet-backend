export class CreatePetError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Create pet Error'
    }
}