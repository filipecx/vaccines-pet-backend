import { PetRepository } from "../../../../Repositories/petRepository";
import { Pet } from "../Entity/Pet";
import { PetNotFoundError } from "./Errors/petNotFoundError";

export class GetPetByIdUseCase {
    constructor(private petRepository: PetRepository){}

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