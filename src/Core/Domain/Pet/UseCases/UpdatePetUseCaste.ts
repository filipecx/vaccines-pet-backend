import { PetRepository } from "../../../../Repositories/petRepository";
import { Pet } from "../Entity/Pet";
import { PetNotFoundError } from "./Errors/petNotFoundError";

export interface PetDTO {
    name: string,
    image: string,
}

export class UpdatePetUseCase {
    constructor(private petRepository: PetRepository){}

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