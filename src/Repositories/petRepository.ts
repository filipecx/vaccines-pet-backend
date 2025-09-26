import { Pet } from "../Core/Domain/Pet/Entity/Pet";

export interface PetRepository {
    createPet(pet: Pet): Promise<void>
    getPetById(id: number): Promise<Pet | null>
    getAllPets(): Promise<Pet[]>
    updatePet(pet: Pet, id: number): Promise<void>
    changePetActiveById(id: number, active: boolean): Promise<void>
    
}