import type PetRepository  from "../Repositories/petRepository.ts";
import { PetNotFoundError } from "./Errors/petNotFoundError.ts";

export class DeletePetUseCase {
    private petRepository: PetRepository

    constructor(petRepository: PetRepository){
        this.petRepository = petRepository
    }

    async execute(id: number): Promise<void> {
        const petData = await this.petRepository.getPetById(id);
            if (!petData) {
                throw new PetNotFoundError("Nenhum pet encontrado com esse ID");
        }
        this.petRepository.deletePet(id);
    }
}