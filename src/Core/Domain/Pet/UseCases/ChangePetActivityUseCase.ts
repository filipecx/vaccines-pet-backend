import { PetNotFoundError } from "./Errors/petNotFoundError.ts";
import type PetRepository  from "../Repositories/petRepository.ts";
export class ChangeActivePetUseCase {
    private petRepository: PetRepository

    constructor(petRepository: PetRepository){
        this.petRepository = petRepository
    }
    async execute(id: number, active: boolean) {
        const petData = await this.petRepository.getPetById(id);
            if (!petData) {
                throw new PetNotFoundError("Nenhum pet encontrado com esse ID");
            }
        await this.petRepository.changePetActiveById(id, active);
    }
}