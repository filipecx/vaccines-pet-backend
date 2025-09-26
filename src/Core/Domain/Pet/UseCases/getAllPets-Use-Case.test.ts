//deve dar certo receber todos os pets

//deve dar erro se não mandar o id do pet

//deve dar erro se não tiver com dados completos do pet

import { describe, it, expect } from "vitest";
import { PetRepository } from "../../../../Repositories/petRepository";
import { GetAllPetsUseCase } from "./getAllPets-use-case";
import { GetPetByIdUseCase } from "./getPetByIdUseCase";
import { DbPetRepository } from "../../../../Repositories/dbPetRepository";
import { PrismaClient } from "@prisma/client";

describe('get all pets tests', () => {
    const prisma = new PrismaClient();
    const petRepository: PetRepository = new DbPetRepository(prisma);
    const useCase = new GetAllPetsUseCase(petRepository);
    const getPetByIdUseCase = new GetPetByIdUseCase(petRepository);

    it('should be able to get all pets', async () => {

        const listOfPets = await useCase.execute()
        expect(listOfPets).toBeInstanceOf(Array)
    })

    it('should throw an error if not pet is found id', async () => {

        await expect(getPetByIdUseCase.execute(143)).rejects.toThrow()
    })
})