import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { VaccinationErrors } from "../Errors/VaccinationErrors";

export class DeleteVaccinationUseCase {
    constructor(private vaccinationRepository: VaccinationRepository){}

    async execute(id: number): Promise<void> {
        const vaccination = await this.vaccinationRepository.getVaccinationById(id);
        if (!vaccination) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        this.vaccinationRepository.deleteVaccination(id);
    }
}