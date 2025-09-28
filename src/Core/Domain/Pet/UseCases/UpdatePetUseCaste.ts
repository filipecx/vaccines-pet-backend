import type PetRepository  from "../Repositories/petRepository.ts";
import { Pet } from "../Entity/Pet.ts";
import { PetNotFoundError } from "./Errors/petNotFoundError.ts";

export interface PetDTO {
    name: string,
    image: string,
}

export class UpdatePetUseCase {
    private petRepository: PetRepository

    constructor(petRepository: PetRepository){
        this.petRepository = petRepository
    }

    async execute(petData: PetDTO, id: number): Promise<Pet> {
        const existes = await this.petRepository.getPetById(id);
        if (!existes) {
            throw new PetNotFoundError("Could not update because there is no pet with this id");
        }
        const updatedPet = new Pet({
            name: petData.name,
            image: petData.image
        })

        return updatedPet;
    }
}