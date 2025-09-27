import { CreateVaccinationUseCase } from '../../../Core/Domain/Vaccination/Entity/UseCases/CreateVaccinationUseCase'
import { GetAllVaccinationsUseCase } from '../../../Core/Domain/Vaccination/Entity/UseCases/GetAllVaccinationsUseCase'
import { GetAllVaccinesByPetIdUseCase } from '../../../Core/Domain/Vaccination/Entity/UseCases/GetAllVaccinesByPetIdUseCase'
import { GetVaccinationByIdUseCase } from '../../../Core/Domain/Vaccination/Entity/UseCases/GetVaccinationByIdUseCase'
import { GetVaccinesByDateOrderUseCase } from '../../../Core/Domain/Vaccination/Entity/UseCases/GetVaccinesByDateOrderUseCase'
import { UpdateVaccinationUseCase } from '../../../Core/Domain/Vaccination/Entity/UseCases/UpdateVaccinationUseCase'
import { DeleteVaccinationUseCase } from '../../../Core/Domain/Vaccination/Entity/UseCases/DeleteVaccinationUseCase'
import { Vaccinations } from '../../../Core/Domain/Vaccination/Entity/Vaccinations'
import { VaccinationErrors } from '../../../Core/Domain/Vaccination/Entity/Errors/VaccinationErrors'
import { Vaccines } from '../../../Core/Domain/Vaccines/Entity/Vaccines'
import { Pet } from '../../../Core/Domain/Pet/Entity/Pet'
import { GetPetByIdUseCase } from '../../../Core/Domain/Pet/UseCases/getPetByIdUseCase'
import { PetNotFoundError } from '../../../Core/Domain/Pet/UseCases/Errors/petNotFoundError'

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

export interface VaccinationResponseDTO {
        id: number,
        petId: number,
        veterinarianName: string,
        veterinarianCrmv: string,
        vaccineName?: string,
        expirationDate: Date,
        manufactureDate: Date,
        batchNumber: string,
        manufacturer: string, 
        date: Date, 
        nextDate: Date
}
export class VaccinationController {
    constructor(
        private createVaccinationUseCase: CreateVaccinationUseCase,
        private getAllVaccinationsUseCase: GetAllVaccinationsUseCase,
        private getVaccinesByPetIdUseCase: GetAllVaccinesByPetIdUseCase,
        private getVaccinationByIdUseCae: GetVaccinationByIdUseCase,
        private getVaccinationByDateOrderUseCase: GetVaccinesByDateOrderUseCase,
        private updateVaccinationUseCase: UpdateVaccinationUseCase,
        private delteVaccinationUseCase: DeleteVaccinationUseCase,
        private getPetByIdUseCase: GetPetByIdUseCase
    ){}

    transformToDto(vaccination: Vaccinations): VaccinationResponseDTO {
            const petId = vaccination.pet?.id;
            const vaccine = vaccination.vaccine;

            if (!petId || !vaccine) {
                throw new VaccinationErrors("Invalid vaccination data");
            }
            const response: VaccinationResponseDTO = {
                id: vaccination.id!,
                petId: petId,
                veterinarianName: vaccination.veterinarianName,
                veterinarianCrmv: vaccination.veterinarianCrmv,
                vaccineName: vaccine.name,
                expirationDate: vaccine.expirationDate,
                manufactureDate: vaccine.manufactureDate,
                batchNumber: vaccine.batchNumber,
                manufacturer: vaccine.manufacturer, 
                date: vaccination.date, 
                nextDate: vaccination.nextDate 
            }
            return response
    }

    async transformToEntity(vaccinationDTO: VaccinationRequestDTO): Promise<Vaccinations> {

        const pet = await this.getPetByIdUseCase.execute(vaccinationDTO.petId)

        if (!pet) {
            throw new PetNotFoundError("No pet found with this Id")
        }

        const vaccine = new Vaccines({
            name: vaccinationDTO.vaccineName,
            batchNumber: vaccinationDTO.batchNumber,
            manufactureDate: vaccinationDTO.manufactureDate,
            manufacturer: vaccinationDTO.manufacturer,
            expirationDate: vaccinationDTO.expirationDate
        })
        
        const entity: Vaccinations = new Vaccinations({
            pet: pet,
            veterinarianName: vaccinationDTO.veterinarianName,
            veterinarianCrmv: vaccinationDTO.veterinarianCrmv,
            vaccine: vaccine,
            nextDate: vaccinationDTO.nextDate,
            date: vaccinationDTO.date
        })

        return entity
    }

    async createVaccination(vaccination: VaccinationRequestDTO) {
        const newVaccination = await this.transformToEntity(vaccination)
        await this.createVaccinationUseCase.execute(newVaccination)
    }

    async getAllVaccinations(): Promise<VaccinationResponseDTO[]> {
        const list = await this.getAllVaccinationsUseCase.execute()
        if (!list || list.length == 0) {
            throw new VaccinationErrors("No vaccinations avaiable")
        }
        const dtoList: VaccinationResponseDTO[] = list.map((vaccination) => {
            return this.transformToDto(vaccination)
        })


        return dtoList
    }

    async getVaccinesByPet(id: number): Promise<VaccinationResponseDTO[]> {
        const list = await this.getVaccinesByPetIdUseCase.execute(id)
        if (!list || list.length == 0) {
            throw new VaccinationErrors("No vaccinations avaiable")
        }
        const dtoList: VaccinationResponseDTO[] = list.map((vaccination) => {
            return this.transformToDto(vaccination)
        })


        return dtoList
         
    }

    async getVaccinationsById(id: number): Promise<VaccinationResponseDTO> {
        const vaccination = await this.getVaccinationByIdUseCae.execute(id)
        return this.transformToDto(vaccination);

    }

    async getVaccinationByDateOrder(petId: number): Promise<VaccinationResponseDTO[]> {
        const list = await this.getVaccinationByDateOrderUseCase.execute(petId);
        if (!list || list.length == 0) {
            throw new VaccinationErrors("No vaccinations avaiable");
        }

        const dtoList: VaccinationResponseDTO[] = list.map((vaccination) => {
            return this.transformToDto(vaccination);
        })

        return dtoList;
    }

    async updateVaccination(vaccinationData: VaccinationRequestDTO, id: number): Promise<void> {
        const vaccination = await this.transformToEntity(vaccinationData);
        
        await this.updateVaccinationUseCase.execute(vaccination, id);
    }

    async deleteVaccination(id: number): Promise<void> {
        await this.delteVaccinationUseCase.execute(id);
    }
}