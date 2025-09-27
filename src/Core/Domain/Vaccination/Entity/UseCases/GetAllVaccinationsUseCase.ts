import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { VaccinationErrors } from "../Errors/VaccinationErrors";
import { Vaccinations } from "../Vaccinations";

export class GetAllVaccinationsUseCase {
    constructor(private vaccinationRepository: VaccinationRepository) {}

    async execute(): Promise<Vaccinations[]>{
        const allVaccinations = this.vaccinationRepository.getAllVaccination()
        if (!allVaccinations) {
            throw new VaccinationErrors("No vaccination avaiable")
        }
        return allVaccinations
    }
}