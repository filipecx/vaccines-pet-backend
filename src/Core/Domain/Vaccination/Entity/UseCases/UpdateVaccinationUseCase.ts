import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { VaccinationErrors } from "../Errors/VaccinationErrors";
import { Vaccinations } from "../Vaccinations";

export class UpdateVaccinationUseCase {
    constructor(private vaccinationRepository: VaccinationRepository){}

    async execute(vaccinationData: Vaccinations, id: number): Promise<void> {
        const vaccination = this.vaccinationRepository.getVaccinationById(id);
        if (!vaccination) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        this.vaccinationRepository.updateVaccination(vaccinationData, id);
    }
}