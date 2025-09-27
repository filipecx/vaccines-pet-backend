import { PetRepository } from "../../../../../Repositories/petRepository";
import { Vaccines } from "../../../Vaccines/Entity/Vaccines";
import { VaccinesRepository } from "../../../Vaccines/Repositories/vaccinesRepository";
import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { Vaccinations } from "../Vaccinations";

export interface VaccinationRequestDTO {
        petId: number,
        veterinarianName: string,
        veterinarianCrmv: string,
        vaccineName: string,
        expirationDate: Date,
        manufactureDate: Date,
        batchNumber: string,
        manufacturer: string, 
        date: Date, 
        nextDate: Date 
}

export class CreateVaccinationUseCase {
    constructor(
        private vaccinationRepository: VaccinationRepository,
        private petRepository: PetRepository,
        private vaccinesRepository: VaccinesRepository
    ){}

    async execute(
        {petId,
        veterinarianName,
        veterinarianCrmv,
        vaccineName,
        expirationDate,
        manufactureDate,
        batchNumber,
        manufacturer, 
        date, 
        nextDate}: VaccinationRequestDTO 
    ): Promise<void> {

        const vaccine: Vaccines = new Vaccines({
            name: vaccineName,
            expirationDate: expirationDate,
            manufactureDate: manufactureDate,
            batchNumber: batchNumber,
            manufacturer: manufacturer
        })
        await this.vaccinesRepository.create(vaccine)
       
        const pet = await this.petRepository.getPetById(petId);
         if (!pet) {
            throw new Error("No pet found")
        }
        
        const vaccination = new Vaccinations({
            date: date,
            nextDate: nextDate,
            pet: pet,
            veterinarianName: veterinarianName,
            veterinarianCrmv: veterinarianCrmv,
            vaccine: vaccine
        })

        await this.vaccinationRepository.createVaccination(vaccination)
    }

}