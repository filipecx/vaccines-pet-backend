import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { VaccinationErrors } from "../Errors/VaccinationErrors";
import { Vaccinations } from "../Vaccinations";

export class getAllVaccinesByPetId {
    constructor(private vaccinationRepository: VaccinationRepository){}

    async execute(id: number): Promise<Vaccinations[]> {
        const list = await this.vaccinationRepository.getAllVaccinesByPetId(id)
        if (!list) {
            throw new VaccinationErrors("No vaccine with this pet id")
        }
        return list
    }
}