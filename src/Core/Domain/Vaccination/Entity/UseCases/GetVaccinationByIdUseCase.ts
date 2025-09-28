import { VaccinationRepository } from "../../Repository/vaccinationRepository.ts";
import { VaccinationErrors } from "../Errors/VaccinationErrors.ts";
import { Vaccinations } from "../Vaccinations.ts";

export class GetVaccinationByIdUseCase {
private vaccinationRepository: VaccinationRepository
        
        
    constructor(vaccinationRepository: VaccinationRepository){
        this.vaccinationRepository = vaccinationRepository;
    }
    async execute(id: number): Promise<Vaccinations> {
        const vaccination = this.vaccinationRepository.getVaccinationById(id);
        if (!vaccination) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        return vaccination
    }
}