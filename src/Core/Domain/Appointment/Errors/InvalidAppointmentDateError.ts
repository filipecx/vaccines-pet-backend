export class InvalidAppointmentDateError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Invalid appointment date error'
    }
}