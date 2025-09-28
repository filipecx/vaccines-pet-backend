import { CreatePet } from '../../../Core/Domain/Pet/UseCases/create-pet-use-case.ts'
import { ChangeActivePetUseCase} from '../../../Core/Domain/Pet/UseCases/ChangePetActivityUseCase.ts'
import { GetAllPetsUseCase } from '../../../Core/Domain/Pet/UseCases/getAllPets-use-case.ts'
import { GetPetByIdUseCase } from '../../../Core/Domain/Pet/UseCases/getPetByIdUseCase.ts'
import { UpdatePetUseCase } from '../../../Core/Domain/Pet/UseCases/UpdatePetUseCaste.ts'
import { DeletePetUseCase } from '../../../Core/Domain/Pet/UseCases/DeletePetUseCase.ts'
import { Pet } from '../../../Core/Domain/Pet/Entity/Pet.ts'
import { DbPetRepository } from "../../../Core/Domain/Pet/Repositories/dbPetRepository.ts"
import { PrismaClient } from '@prisma/client'
import express, { Request, Response, NextFunction } from 'express';
export interface PetRequest {
    name: string;
    image: string
}

export interface PetResponseDTO {
    id: number,
    name: string,
    image: string
}
const prisma = new PrismaClient();
const petRepository = new DbPetRepository(prisma);
const createPetCase = new CreatePet(petRepository);
const changeActiveCase = new ChangeActivePetUseCase(petRepository);
const getAllPetsCase = new GetAllPetsUseCase(petRepository);
const getPetByIdCase = new GetPetByIdUseCase(petRepository);
const updatePetCase = new UpdatePetUseCase(petRepository);
const deltePetCase = new DeletePetUseCase(petRepository);



    export async function createPet(request: Request, response: Response): Promise<void>{
        try {
            await createPetCase.execute({
                name: request.body.name,
                image: request.body.image
            })
            response.status(201).json({message: 'Pet added succesfully'})
        } catch (error) {
            response.status(400).json({message: 'Could not add pet'})
        }

        
    }

    export async function changeActive(req: Request, res: Response): Promise<void>{
        try {
            await changeActiveCase.execute(Number(req.params.id), req.body)
            res.status(204).json({message: 'Active changed succefully'});
        } catch(error) {
            res.status(400).json({message: 'Could not change active'});
        }
        
    }

    export async function getAllPets(req: Request, res: Response): Promise<void> {
        try {
            const data: Pet[] = await getAllPetsCase.execute()
            const petDTOList: PetResponseDTO[] = data.map((pet) => {
                if (!pet.id) {
                    throw new Error("No pet")
                }
                return {
                    id: pet.id,
                    name: pet.name,
                    image: pet.image
                }
            })
            res.status(200).json(petDTOList);
        } catch (error) {
            res.status(404).json({message: 'No pet found'});
        }
    }

    export async function getPet(req: Request, res: Response): Promise<void> {
        try {
            const pet = await getPetByIdCase.execute(Number(req.params.id));
            res.status(200).json(pet);
        } catch (error) {
            res.status(404).json({message: "No pet found with this id"});
        }
    }

    export async function updatePet(req: Request, res: Response): Promise<void> {    
        try {
            await updatePetCase.execute(req.body, Number(req.params.id));
            res.status(204).json({message: "Pet succefully updated"});
        } catch (error) {
            res.status(400).json({message: "Could not update pet"});
        }
    }

    export async function deletePet(req: Request, res: Response): Promise<void> {
        
        try {
            await deltePetCase.execute(Number(req.params.id));
            res.status(204).json({message: 'Pet succefully deleted'})
        } catch (error) {
            res.status(409).json({message: "Could not delete pet"});
        }
    }

/*
export class PetController {
    constructor(
        private createPetCase: CreatePet,
        private changeActiveCase: ChangeActivePetUseCase,
        private getAllPetsCase: GetAllPetsUseCase,
        private getPetByIdCase: GetPetByIdUseCase,
        private updatePetCase: UpdatePetUseCase,
        private deltePetCase: DeletePetUseCase
    ){}

    async createPet(request: Request, response: Response): Promise<void>{
        try {
            await this.createPetCase.execute({
                name: request.body.name,
                image: request.body.image
            })
            response.status(201).json({message: 'Pet added succesfully'})
        } catch (error) {
            response.status(400).json({message: 'Could not add pet'})
        }

        
    }

    async changeActive(req: Request, res: Response): Promise<void>{
        try {
            await this.changeActiveCase.execute(Number(req.params.id), req.body)
            res.status(204).json({message: 'Active changed succefully'});
        } catch(error) {
            res.status(400).json({message: 'Could not change active'});
        }
        
    }

    async getAllPets(req: Request, res: Response): Promise<void> {
        try {
            const data: Pet[] = await this.getAllPetsCase.execute()
            const petDTOList: PetResponseDTO[] = data.map((pet) => {
                if (!pet.id) {
                    throw new Error("No pet")
                }
                return {
                    id: pet.id,
                    name: pet.name,
                    image: pet.image
                }
            })
            res.status(200).json(petDTOList);
        } catch (error) {
            res.status(404).json({message: 'No pet found'});
        }
    }

    async getPet(req: Request, res: Response): Promise<void> {
        try {
            const pet = await this.getPetByIdCase.execute(Number(req.params.id));
            res.status(200).json(pet);
        } catch (error) {
            res.status(404).json({message: "No pet found with this id"});
        }
    }

    async updatePet(req: Request, res: Response): Promise<void> {    
        try {
            await this.updatePetCase.execute(req.body, Number(req.params.id));
            res.status(204).json({message: "Pet succefully updated"});
        } catch (error) {
            res.status(400).json({message: "Could not update pet"});
        }
    }

    async deletePet(req: Request, res: Response): Promise<void> {
        
        try {
            await this.deltePetCase.execute(Number(req.params.id));
            res.status(204).json({message: 'Pet succefully deleted'})
        } catch (error) {
            res.status(409).json({message: "Could not delete pet"});
        }
    }
}
    */