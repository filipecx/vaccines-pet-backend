import type PetRepository  from "../Repositories/petRepository.ts";
import { Pet } from "../Entity/Pet.ts";
import { PetNotFoundError } from "./Errors/petNotFoundError.ts";

export class GetPetByIdUseCase {
    private petRepository: PetRepository

    constructor(petRepository: PetRepository){
        this.petRepository = petRepository
    }

    async execute(request: number): Promise<Pet>{
        const petData = await this.petRepository.getPetById(request);
        if (!petData) {
            throw new PetNotFoundError("Nenhum pet encontrado com esse ID");
        }
        const pet = new Pet({
            id: petData.id,
            name: petData.name,
            image: petData.image
        })

        return pet

    }
}