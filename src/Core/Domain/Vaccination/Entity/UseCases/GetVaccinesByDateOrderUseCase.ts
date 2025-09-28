import { VaccinationRepository } from "../../Repository/vaccinationRepository.ts";
import { VaccinationErrors } from "../Errors/VaccinationErrors.ts";
import { Vaccinations } from "../Vaccinations.ts";

export class GetVaccinesByDateOrderUseCase {
private vaccinationRepository: VaccinationRepository
        
        
    constructor(vaccinationRepository: VaccinationRepository){
        this.vaccinationRepository = vaccinationRepository;
    }
    async execute(id: number): Promise<Vaccinations[]> {
        const list = await this.vaccinationRepository.getVaccinesByDateOrder(id)
        if (!list) {
            throw new VaccinationErrors("No vaccinations avaiable")
        }
        return list
    }
}