import { Pet } from "../Core/Domain/Pet/Entity/Pet";
import { PetRepository } from "./petRepository";
import { PrismaClient } from "@prisma/client";


export class DbPetRepository implements PetRepository {
    constructor(private prisma: PrismaClient) {}

    public static create(prismaClient: PrismaClient) {
        return new DbPetRepository(prismaClient);
    }
    
    async createPet(pet: Pet): Promise<Pet> {
        const petData = await this.prisma.pet.create({
            data: {
                name: pet.name,
                image: pet.image,
                //active: pet.active
            }
        })
        const newPet = new Pet({
            id: petData.id,
            name: petData.name,
            image: petData.image,
            active: petData.active
        })
        return newPet
    }

    async getPetById(id: number): Promise<Pet> {
        const data: any = await this.prisma.pet.findUnique({where: {id: id}})
        const pet: Pet = new Pet({
            name: data.name,
            image: data.image,
            active: data.active
        })
        return pet
    }

    async getAllPets(): Promise<Pet[]> {
        const dataList = await this.prisma.pet.findMany()
        const petsList = dataList.map((pet) => {
            return new Pet({
                name: pet.name,
                image: pet.image,
                active: pet.active
            })
        })
        return petsList;

    }

    async updatePet(pet: Pet, id: number): Promise<void> {
        await this.prisma.pet.update({
            where: {id: id},
            data: {
                name: pet.name,
                image: pet.image,
                active: pet.active
            }
        })
    }

    async changePetActiveById(id: number, active: boolean): Promise<void> {
        await this.prisma.pet.update({where: {id: id}, data: {active: active}})
    }


}