import { CreatePet } from '../../../Core/Domain/Pet/UseCases/create-pet-use-case'
import { ChangeActivePetUseCase} from '../../../Core/Domain/Pet/UseCases/ChangePetActivityUseCase'
import { GetAllPetsUseCase } from '../../../Core/Domain/Pet/UseCases/getAllPets-use-case'
import { GetPetByIdUseCase } from '../../../Core/Domain/Pet/UseCases/getPetByIdUseCase'
import { UpdatePetUseCase } from '../../../Core/Domain/Pet/UseCases/UpdatePetUseCaste'
import { DeletePetUseCase } from '../../../Core/Domain/Pet/UseCases/DeletePetUseCase'
import { Pet } from '../../../Core/Domain/Pet/Entity/Pet'

export interface PetRequest {
    name: string;
    image: string
}
export class PetController {
    constructor(
        private createPetCase: CreatePet,
        private changeActiveCase: ChangeActivePetUseCase,
        private getAllPetsCase: GetAllPetsUseCase,
        private getPetByIdCase: GetPetByIdUseCase,
        private updatePetCase: UpdatePetUseCase,
        private deltePetCase: DeletePetUseCase
    ){}

    async createPet(request: PetRequest){

        this.createPetCase.execute({
            name: request.name,
            image: request.image
        })
    }

    async changeActive(id: number, active: boolean){
        this.changeActiveCase.execute(id, active)
    }

    async getAllPets(): Promise<Pet[]> {
        return this.getAllPetsCase.execute()
    }

    async getPet(id: number): Promise<Pet> {
        return this.getPetByIdCase.execute(id);
    }

    async updatePet(petData: PetRequest, id: number) {
        this.updatePetCase.execute(petData, id);
    }

    async deletePet(id: number) {
        this.deltePetCase.execute(id);
    }
}