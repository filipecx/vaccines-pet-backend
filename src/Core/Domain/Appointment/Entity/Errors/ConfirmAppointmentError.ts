export class ConfirmAppointmentError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'Confir Appointment Error'
    }
}