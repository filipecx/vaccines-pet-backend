import { CreateClinicError } from "../Clinic/Erros/CreateClinicError";

export class Address {
    constructor(public street: string, public number: string) {
        if (!street || !number) {
            throw new CreateClinicError("Street and number required")
        }
    }
}