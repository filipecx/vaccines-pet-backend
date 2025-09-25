export class VaccinationErrors extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Vaccination error"
    }
}