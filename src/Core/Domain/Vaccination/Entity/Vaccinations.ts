import { Vaccines } from "../../Vaccines/Entity/Vaccines.ts";
import { Pet } from "../../Pet/Entity/Pet.ts";
import { Veterinarians } from "../../Veterinarian/Entity/Veterinarians.ts";
import { VaccinationErrors } from "./Errors/VaccinationErrors.ts";

export interface VaccinationsProps {
    id?: number;
    date: Date;
    nextDate: Date;
    pet: Pet;
    veterinarianName: string;
    veterinarianCrmv: string
    vaccine: Vaccines;
    done?: boolean;
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

    get veterinarianName(): string {
        return this.props.veterinarianName;
    }

    get veterinarianCrmv(): string {
        return this.props.veterinarianCrmv;
    }

    get vaccine(): Vaccines {
        return this.props.vaccine
    }

    get done(): boolean | undefined{
        return this.props.done
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