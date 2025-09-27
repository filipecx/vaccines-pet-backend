import { Pet } from "../../Pet/Entity/Pet";
import { Veterinarians } from "../../Veterinarian/Entity/Veterinarians"
import { Vaccinations } from "../Entity/Vaccinations"

export interface VaccinationRepository {
   

    createVaccination(vaccination: Vaccinations): Promise<void>

    getAllVaccination(): Promise<Vaccinations[]>
    getVaccinationById(id: number): Promise<Vaccinations>
    getAllVaccinesByPetId(id: number): Promise<Vaccinations[]>
    getVaccinesByDateOrder(petId: number): Promise<Vaccinations[]>

    updateVaccination(vaccinationData: Vaccinations, id: number): Promise<void>

    deleteVaccination(id: number): Promise<void>

}

