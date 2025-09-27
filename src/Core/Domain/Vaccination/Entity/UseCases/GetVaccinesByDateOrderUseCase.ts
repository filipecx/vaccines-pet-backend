import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { VaccinationErrors } from "../Errors/VaccinationErrors";
import { Vaccinations } from "../Vaccinations";

export class GetVaccinesByDateOrderUseCase {
    constructor(private vaccinationRepository: VaccinationRepository){}

    async execute(id: number): Promise<Vaccinations[]> {
        const list = await this.vaccinationRepository.getVaccinesByDateOrder(id)
        if (!list) {
            throw new VaccinationErrors("No vaccinations avaiable")
        }
        return list
    }
}