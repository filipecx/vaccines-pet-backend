import { PrismaClient } from "@prisma/client";
import { Vaccines } from "../Entity/Vaccines.ts";
import { VaccinesRepository } from "./vaccinesRepository.ts";
import { NoVaccinesError } from "../Entity/Errors/NoVaccinesError.ts"

export class DbVaccinesRepository implements VaccinesRepository {
    private prisma: PrismaClient
    constructor(prisma: PrismaClient) {
        this.prisma = prisma
    }
    async create(vaccine: Vaccines): Promise<Vaccines> {
        const vaccineData = await this.prisma.vaccines.create({
            data: {
                name: vaccine.name,
                expirationDate: vaccine.expirationDate,
                manufactureDate: vaccine.manufactureDate,
                batchNumber: vaccine.batchNumber,
                manufacturer: vaccine.manufacturer
            }
        })

        const newVaccine = new Vaccines({
            name: vaccineData.name,
            expirationDate: vaccineData.expirationDate,
            manufactureDate: vaccineData.manufactureDate,
            batchNumber: vaccineData.batchNumber,
            manufacturer: vaccineData.manufacturer
        })
        return newVaccine;

    }

    async getAll(): Promise<Vaccines[]> {

        const listData = await this.prisma.vaccines.findMany();


        const listVaccines: Vaccines[] = listData.map((vaccine) => {
            return new Vaccines({
                id: vaccine.id,
                name: vaccine.name,
                expirationDate: vaccine.expirationDate,
                manufactureDate: vaccine.manufactureDate,
                batchNumber: vaccine.batchNumber,
                manufacturer: vaccine.manufacturer
                
            })
        })
        if (!listVaccines) {
            throw new NoVaccinesError("No vaccines in the list")
        }
        return listVaccines;
        
    }

    async getbyId(id: number): Promise<Vaccines> {
        const vaccineData = await this.prisma.vaccines.findUnique({where: {id: id}})
        if (!vaccineData) {
            throw new NoVaccinesError("No vaccine with this id")
        }
        return new Vaccines(vaccineData)
    }

    async update(id: number, vaccine: Vaccines): Promise<void> {
        const vaccineData = await this.prisma.vaccines.findUnique({where: {id: id}})
        if (!vaccineData) {
            throw new NoVaccinesError("No vaccine with this id")
        }
        await this.prisma.vaccines.update({where: {id: id}, data: {
            name: vaccine.name,
            expirationDate: vaccine.expirationDate,
            manufactureDate: vaccine.manufactureDate,
            batchNumber: vaccine.batchNumber,
            manufacturer: vaccine.manufacturer
        }})

    }

    async delete(id: number): Promise<void> {
        const vaccineData = await this.prisma.vaccines.findUnique({where: {id: id}})
        if (!vaccineData) {
            throw new NoVaccinesError("No vaccine with this id")
        }
        await this.prisma.vaccines.delete({where: {id: id}})
    }
}