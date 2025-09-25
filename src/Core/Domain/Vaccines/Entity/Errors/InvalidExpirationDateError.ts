export class InvalidExpirationDateError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "Invalid expiration date error"
    }
}