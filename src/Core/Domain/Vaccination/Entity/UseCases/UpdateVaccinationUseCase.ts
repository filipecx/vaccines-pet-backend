import { VaccinationRepository } from "../../Repository/vaccinationRepository.ts";
import { VaccinationErrors } from "../Errors/VaccinationErrors.ts";
import { Vaccinations } from "../Vaccinations.ts";

export class UpdateVaccinationUseCase {
private vaccinationRepository: VaccinationRepository
        
        
    constructor(vaccinationRepository: VaccinationRepository){
        this.vaccinationRepository = vaccinationRepository;
    }
    async execute(vaccinationData: Vaccinations, id: number): Promise<void> {
        const vaccination = this.vaccinationRepository.getVaccinationById(id);
        if (!vaccination) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        this.vaccinationRepository.updateVaccination(vaccinationData, id);
    }
}