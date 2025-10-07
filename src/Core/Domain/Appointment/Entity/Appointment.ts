import { CancelAppointmentError } from "./Errors/CancelAppointmentError";
import { ConfirmAppointmentError } from "./Errors/ConfirmAppointmentError";
import { CompleteAppointmentError } from "./Errors/CompleteAppointmentError";
import { InvalidAppointmentDateError } from "./Errors/InvalidAppointmentDateError"

export type appointmentStatus = 'REQUESTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELED'

export interface AppointmentProps {
    id?: number;
    date: Date;
    petId: number;
    clinicId: number;
    status: appointmentStatus;
}

export class Appointment implements AppointmentProps{
    private props: AppointmentProps;

    private constructor(props: AppointmentProps) {
        this.props = props;
    }

    get id() {
        return this.props.id
    }

    get date() {
        return this.props.date
    }

    get petId() {
        return this.props.petId
    }

    get clinicId() {
        return this.props.clinicId
    }

    get status() {
        return this.props.status
    }

    confirmAppointment() {
        if (this.props.status == 'CANCELED' || this.props.status == 'COMPLETED') {
            throw new ConfirmAppointmentError('A canceled or completed appointment cannot be confirmed')
        }
        if (this.props.status == 'SCHEDULED') {
            throw new ConfirmAppointmentError('This appointment is already confirmed')
        }
        if (this.props.status == 'REQUESTED') {
            this.props.status = 'SCHEDULED'
        }
    }

    cancelAppointment() {
        if (this.props.status == 'CANCELED' || this.props.status == 'COMPLETED') {
            throw new CancelAppointmentError('A canceled or completed appointment cannot be canceled')
        }
    
        this.props.status = 'CANCELED'
    }

    completeAppointment() {
        if (this.props.status != 'SCHEDULED') {
            throw new CompleteAppointmentError('Cant complete appointment with this status')
        }
        this.props.status = 'COMPLETED'
    }

    static validateDate(date: Date) {
        const today = new Date();
        if (date < today) {
            throw new InvalidAppointmentDateError('Cant schedule before today');
        }

    }
    static create(props: AppointmentProps) {
        this.validateDate(props.date);
        const initialProps: AppointmentProps = {...props, status: props.status || 'REQUESTED'}
        return new Appointment(initialProps);
    }


}