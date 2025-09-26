import { Pet } from "../Entity/Pet";
import { describe, it, expect } from "vitest";
import { CreatePet } from "./create-pet-use-case";
import { DbPetRepository } from "../../../../Repositories/dbPetRepository";
import { PrismaClient } from "@prisma/client";
import { PetRepository } from "../../../../Repositories/petRepository";

describe('tests for the create pet use-case', () => {

    const prisma = new PrismaClient()
    const petRepository: PetRepository = new DbPetRepository(prisma);
    const createPetUseCase = new CreatePet(petRepository)

    it('should be able to create a new pet', async () => {
        const request = {name: 'Hugo', image: 'urlaal#$5#'}
        

        const pet = await createPetUseCase.execute(request)

        expect(pet).toBeInstanceOf(Pet)
        //expect(pet.id).toBeDefined()
    })

    it('should not be able to create a pet without a name', async () => {
        const request = {name: 'H', image: 'ydfukn4j5yh'}

        await expect(() => createPetUseCase.execute(request)).rejects.toThrow()
    })
})