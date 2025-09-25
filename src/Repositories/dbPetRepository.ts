import { Pet } from "../Core/Domain/Pet/Entity/Pet";
import { PetRepository } from "./petRepository";

export class DbPetRepository implements PetRepository {
    
    async createPet(pet: Pet): Promise<void> {
        
    }

    async getPetById(id: number): Promise<Pet> {
        
    }

    async getPetByVaccine(vaccineId: number): Promise<Pet> {
        
    }

    async updatePet(pet: Pet): Promise<void> {
        
    }

    async changePetActiveById(id: number): Promise<void> {
        
    }


}