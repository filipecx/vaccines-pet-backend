export class CompleteAppointmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Complete appointment error'
    }
}