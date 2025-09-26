import { InvalidExpirationDateError } from "./Errors/InvalidExpirationDateError";

export interface VaccinesProps {
    id?: number,
    name: string;
    expirationDate: Date;
    manufactureDate: Date;
    batchNumber: string;
    manufacturer: string;
}
export class Vaccines {
    private props: VaccinesProps;

    get id(): number | undefined{
        return this.props.id
    }
    
    get name(): string {
        return this.props.name
    }

    get expirationDate(): Date {
        return this.props.expirationDate
    }

    get manufactureDate(): Date {
        return this.props.manufactureDate
    }

    get batchNumber(): string {
        return this.props.batchNumber
    }

    get manufacturer(): string {
        return this.props.manufacturer
    }

    validateDate(expirationDate: Date, manufactureDate: Date): boolean {
        if (expirationDate < manufactureDate) {
            throw new InvalidExpirationDateError("The expiration date can't be earlier than the manufacture date")
        }
        return true
    }

    constructor(props: VaccinesProps) {
        this.validateDate(props.expirationDate, props.manufactureDate)
        this.props = props
    }


}