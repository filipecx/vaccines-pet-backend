export class InvalidVeterinarianDataError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "Invalid veterinarian data error"
    }
}