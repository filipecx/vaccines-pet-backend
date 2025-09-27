import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { VaccinationErrors } from "../Errors/VaccinationErrors";
import { Vaccinations } from "../Vaccinations";

export class getVaccinationById {
    constructor(private vaccinationRepository: VaccinationRepository){}

    async execute(id: number): Promise<Vaccinations> {
        const vaccination = this.vaccinationRepository.getVaccinationById(id);
        if (!vaccination) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        return vaccination
    }
}