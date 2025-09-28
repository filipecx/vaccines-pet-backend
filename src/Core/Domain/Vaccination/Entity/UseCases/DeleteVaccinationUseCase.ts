import { VaccinationRepository } from "../../Repository/vaccinationRepository.ts";
import { VaccinationErrors } from "../Errors/VaccinationErrors.ts";

export class DeleteVaccinationUseCase {
    private vaccinationRepository: VaccinationRepository
        
        
    constructor(vaccinationRepository: VaccinationRepository){
        this.vaccinationRepository = vaccinationRepository;
    }

    async execute(id: number): Promise<void> {
        const vaccination = await this.vaccinationRepository.getVaccinationById(id);
        if (!vaccination) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        this.vaccinationRepository.deleteVaccination(id);
    }
}