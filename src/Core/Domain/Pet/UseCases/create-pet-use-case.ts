import { PetRepository } from "../../../../Repositories/petRepository";
import { Pet } from "../Entity/Pet";

export interface CreatePetRequest {
    name: string;
    image: string
}
type CreatePetResponse = Pet

export class CreatePet {
    constructor(private petRepository: PetRepository){}

    async execute(request: CreatePetRequest): Promise<Pet> {

        const newPet = new Pet({
            name: request.name,
            image: request.image

        })
        const created = await this.petRepository.createPet(newPet);
        return created;
    }
}