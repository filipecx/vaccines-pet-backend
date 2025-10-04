import { Pet } from "../Pet/Entity/Pet";
import { InvalidAppointmentDateError } from "./Errors/InvalidAppointmentDateError";


export enum appointmentStatus  { accepted = "accepted", denied = "denied", pending = "pending" }
export interface AppointmentInterface {
     id?: number;
     date: Date;
     addres: string;
     pet: Pet;
     status: appointmentStatus;

}

export class Appointment {
     
     constructor(private props: AppointmentInterface) {
        this.validateDate(props.date)
        this.props = props;
     }

    get id() {
        return this.props.id;
    }

    get date() {
        return this.props.date;
    }

    get address() {
        return this.props.addres;
    }

    get pet() {
        return this.props.pet;
    }

    get status() {
        return this.props.status
    }

    changeDate(newDate: Date): void {
        this.validateDate(newDate);
        this.props.date = newDate;
        return ;
    }

    changeStatus(newStatus: appointmentStatus): void {
        this.props.status = newStatus;
    }

    validateDate(date: Date): boolean {
        const today = new Date();
        if (date < today) {
            throw new InvalidAppointmentDateError("Date cant be earlier than today!")
        }
        return true;
    }
}