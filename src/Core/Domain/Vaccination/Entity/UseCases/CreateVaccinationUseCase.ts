import { PetRepository } from "../../../../../Repositories/petRepository";
import { Vaccines } from "../../../Vaccines/Entity/Vaccines";
import { VaccinesRepository } from "../../../Vaccines/Repositories/vaccinesRepository";
import { VaccinationRepository } from "../../Repository/vaccinationRepository";
import { Vaccinations } from "../Vaccinations";


export class CreateVaccinationUseCase {
    constructor(
        private vaccinationRepository: VaccinationRepository,
        private petRepository: PetRepository,
        private vaccinesRepository: VaccinesRepository
    ){}

    async execute(vaccination: Vaccinations): Promise<void> {
        //o melhor era ter um usecase de vaccine, pra chamar no controller e enviar já a vaccination toda pronta

        const vaccine: Vaccines = new Vaccines({
            name: vaccination.vaccine.name,
            expirationDate: vaccination.vaccine.expirationDate,
            manufactureDate: vaccination.vaccine.manufactureDate,
            batchNumber: vaccination.vaccine.batchNumber,
            manufacturer: vaccination.vaccine.manufacturer
        })
        await this.vaccinesRepository.create(vaccine)

        if (!vaccination.pet.id) {
            throw new Error("No pet found")
        }

        const pet = await this.petRepository.getPetById(vaccination.pet.id);
         if (!pet) {
            throw new Error("No pet found")
        }
        
        const newVaccination = new Vaccinations({
            date: vaccination.date,
            nextDate: vaccination.nextDate,
            pet: pet,
            veterinarianName: vaccination.veterinarianName,
            veterinarianCrmv: vaccination.veterinarianCrmv,
            vaccine: vaccine
        })

        await this.vaccinationRepository.createVaccination(newVaccination)
    }

}