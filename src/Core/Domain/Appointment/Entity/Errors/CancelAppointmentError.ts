export class CancelAppointmentError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "Cancel appointment error"
    }
}