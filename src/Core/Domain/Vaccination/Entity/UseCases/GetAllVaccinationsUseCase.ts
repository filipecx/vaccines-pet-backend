import { VaccinationRepository } from "../../Repository/vaccinationRepository.ts";
import { VaccinationErrors } from "../Errors/VaccinationErrors.ts";
import { Vaccinations } from "../Vaccinations.ts";

export class GetAllVaccinationsUseCase {
private vaccinationRepository: VaccinationRepository
        
        
    constructor(vaccinationRepository: VaccinationRepository){
        this.vaccinationRepository = vaccinationRepository;
    }
    async execute(): Promise<Vaccinations[]>{
        const allVaccinations = this.vaccinationRepository.getAllVaccination()
        if (!allVaccinations) {
            throw new VaccinationErrors("No vaccination avaiable")
        }
        return allVaccinations
    }
}