import { PetRepository } from "../../../../Repositories/petRepository";
import { PetNotFoundError } from "./Errors/petNotFoundError";

export class DeletePetUseCase {
    constructor(private petRepository: PetRepository){}

    async execute(id: number): Promise<void> {
        const petData = await this.petRepository.getPetById(id);
            if (!petData) {
                throw new PetNotFoundError("Nenhum pet encontrado com esse ID");
        }
        this.petRepository.deletePet(id);
    }
}