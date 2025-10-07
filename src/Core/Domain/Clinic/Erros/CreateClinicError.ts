export class CreateClinicError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Create clinic error'
    }
}