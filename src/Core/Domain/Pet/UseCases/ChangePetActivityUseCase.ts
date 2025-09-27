import { PetRepository } from "../../../../Repositories/petRepository";
import { PetNotFoundError } from "./Errors/petNotFoundError";

export class ChangeActivePetUseCase {
    constructor(private petRepository: PetRepository){}

    async execute(id: number, active: boolean) {
        const petData = await this.petRepository.getPetById(id);
            if (!petData) {
                throw new PetNotFoundError("Nenhum pet encontrado com esse ID");
            }
        await this.petRepository.changePetActiveById(id, active);
    }
}