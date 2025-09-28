import { Pet } from "../Entity/Pet.ts";

import type PetRepository  from "../Repositories/petRepository.ts";
export interface CreatePetRequest {
    name: string;
    image: string
}

export class CreatePet {
    private petRepository: PetRepository

    constructor(petRepository: PetRepository){
        this.petRepository = petRepository
    }

    async execute(request: CreatePetRequest): Promise<Pet> {

        const newPet = new Pet({
            name: request.name,
            image: request.image

        })
        const created = await this.petRepository.createPet(newPet)
        return created;
    }
}