import { Pet } from "../../Pet/Entity/Pet";
import { Veterinarians } from "../../Veterinarian/Entity/Veterinarians";
import { VaccinationErrors } from "./Errors/VaccinationErrors";

export interface VaccinationsProps {
    id?: number;
    date: Date;
    nextDate: Date;
    pet: Pet;
    veterinarian: Veterinarians;

    
}

export class Vaccinations {
    private props: VaccinationsProps

    get id(): number | undefined{
        return this.props.id;
    }

    get date(): Date {
        return this.props.date;
    }

    get nextDate(): Date {
        return this.props.nextDate;
    }

    get pet(): Pet {
        return this.props.pet;
    }

    get veterinarian(): Veterinarians {
        return this.props.veterinarian;
    }

    validateVaccinationDate(date: Date, nextDate: Date): boolean {
        if (nextDate <= date) {
            throw new VaccinationErrors("The next date must be after the administration date")
        }
        return true
    }


    constructor(props: VaccinationsProps) {
        this.validateVaccinationDate(props.date, props.nextDate)
        this.props = props
    }

}