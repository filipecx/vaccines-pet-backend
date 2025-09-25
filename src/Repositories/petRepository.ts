import { Pet } from "../Core/Domain/Pet/Entity/Pet";

export interface PetRepository {
    createPet(pet: Pet): Promise<void>
    getPetById(id: number): Promise<Pet>
    getPetByVaccine(vaccineId: number): Promise<Pet>
    updatePet(pet: Pet): Promise<void>
    changePetActiveById(id: number): Promise<void>
    
}