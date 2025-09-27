import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { Vaccinations } from "../Vaccinations";

export class GetAllVaccinationsUseCase {
    constructor(private vaccinationRepository: VaccinationRepository) {}

    async execute(): Promise<Vaccinations[]>{
        const allVaccinations = this.vaccinationRepository.getAllVaccination()
        return allVaccinations
    }
}