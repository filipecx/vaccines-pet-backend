import { PetRepository } from "../../../Pet/Repositories/petRepository.ts";
import { Vaccines } from "../../../Vaccines/Entity/Vaccines.ts";
import { VaccinesRepository } from "../../../Vaccines/Repositories/vaccinesRepository.ts";
import { VaccinationRepository } from "../../Repository/vaccinationRepository.ts";
import { Vaccinations } from "../Vaccinations.ts";


export class CreateVaccinationUseCase {
    private vaccinationRepository: VaccinationRepository
    private petRepository: PetRepository
    private vaccinesRepository: VaccinesRepository
    
    constructor(vaccinationRepository: VaccinationRepository, petRepository: PetRepository, vaccinesRepository: VaccinesRepository){
        this.petRepository = petRepository;
        this.vaccinationRepository = vaccinationRepository;
        this.vaccinesRepository = vaccinesRepository;
    }

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