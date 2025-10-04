import { test, describe, it, expect, beforeEach } from "vitest";
import { Appointment, appointmentStatus } from "../Appointment";
import { Pet } from "../../Pet/Entity/Pet";

describe('Appointment entity tests', () => {
    
    let status: appointmentStatus = appointmentStatus.pending
    const validPetData = {
            name: 'Antônio',
            image: 'imageUrl'
        }
    const pet = new Pet(validPetData);
    const date = new Date();
    date.setDate(date.getDate() + 4);
    const validData = {
        id: 2,
        date: date,
        addres: "José meneleu",
        pet: pet,
        status: status,
    }
    const invalidDate = new Date();
    invalidDate.setDate(date.getDate() - 4);
    const invalidData = {
        id: 2,
        date: invalidDate,
        addres: "José meneleu",
        pet: pet,
        status: status,
    }

    const appointment = new Appointment(validData);

    it('should create an appointment', () => {

        expect(appointment).toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment', () => {
        expect(() => new Appointment(invalidData)).toThrowError("Date cant be earlier than today!")
    })

    it('should throw a invalid date error', () => {

        expect(() => appointment.changeDate(invalidDate)).toThrowError("Date cant be earlier than today!");
    })

    it('should change appointment status', () => {
        appointment.changeStatus(appointmentStatus.accepted);
        expect(appointment.status).toBe(appointmentStatus.accepted);
    })

})