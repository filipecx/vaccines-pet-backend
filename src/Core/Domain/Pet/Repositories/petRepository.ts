import { Pet } from "../Entity/Pet.ts";

export default interface PetRepository {
    createPet(pet: Pet): Promise<Pet>
    getPetById(id: number): Promise<Pet | null>
    getAllPets(): Promise<Pet[]>
    updatePet(pet: Pet, id: number): Promise<void>
    changePetActiveById(id: number, active: boolean): Promise<void>
    deletePet(id: number): Promise<void>
    
}