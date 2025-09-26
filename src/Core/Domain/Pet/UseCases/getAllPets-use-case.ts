import { PetRepository } from "../../../../Repositories/petRepository"
import { Pet } from "../Entity/Pet"

export class GetAllPetsUseCase {

    constructor(private petRepository: PetRepository){}

    async execute(): Promise<Pet[]> {
        const list = await this.petRepository.getAllPets();

        const petList = list.map((data) => {
            return new Pet({
                id: data.id,
                name: data.name,
                image: data.image
            })
        })

        return petList
        
    }
}