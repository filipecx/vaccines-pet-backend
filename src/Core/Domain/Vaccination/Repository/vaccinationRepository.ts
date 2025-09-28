
import { Vaccinations } from "../Entity/Vaccinations.ts"

export interface VaccinationRepository {
   

    createVaccination(vaccination: Vaccinations): Promise<void>

    getAllVaccination(): Promise<Vaccinations[]>
    getVaccinationById(id: number): Promise<Vaccinations>
    getAllVaccinesByPetId(id: number): Promise<Vaccinations[]>
    getVaccinesByDateOrder(petId: number): Promise<Vaccinations[]>

    updateVaccination(vaccinationData: Vaccinations, id: number): Promise<void>

    deleteVaccination(id: number): Promise<void>

}

