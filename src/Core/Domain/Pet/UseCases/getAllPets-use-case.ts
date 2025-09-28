import { Pet } from "../Entity/Pet.ts"
import type PetRepository  from "../Repositories/petRepository.ts";

export class GetAllPetsUseCase {

    private petRepository: PetRepository

    constructor(petRepository: PetRepository){
        this.petRepository = petRepository
    }

    async execute(): Promise<Pet[]> {
        const list = await this.petRepository.getAllPets();

        const petList = list.map((data) => {
            return new Pet({
                id: data.id,
                name: data.name,
                image: data.image
            })
        })

        return petList
        
    }
}