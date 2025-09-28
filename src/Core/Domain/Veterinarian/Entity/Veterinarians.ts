import { InvalidVeterinarianDataError } from "./Errors/InvalidVeterinarianDataError.ts";

export interface VeterinariansProps {
    id?: number;
    crmv: string;
    name: string;
}

export class Veterinarians implements VeterinariansProps {
    private props: VeterinariansProps

    get id(): number | undefined {
        return this.props.id
    }

    get crmv(): string {
        return this.props.crmv
    }

    get name(): string {
        return  this.props.name
    }

    validateCrmv(crmv: string): boolean {
        if (crmv.length < 4) {
            throw new InvalidVeterinarianDataError("Insert a valid CRMV number")
        }
        return true
    }


    constructor(props: VeterinariansProps) {
        this.validateCrmv(props.crmv)
        this.props = props
    }
}