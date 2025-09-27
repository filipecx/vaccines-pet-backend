import { PrismaClient } from "@prisma/client";
import { VaccinationRepository } from "./vaccinationRepository";
import { Pet } from "../../Pet/Entity/Pet";
import { Veterinarians } from "../../Veterinarian/Entity/Veterinarians";
import { Vaccinations } from "../Entity/Vaccinations";
import { VaccinationErrors } from "../Entity/Errors/VaccinationErrors";
import { Vaccines } from "../../Vaccines/Entity/Vaccines";

export class DbVaccinationRepository implements VaccinationRepository {
    constructor(private prisma: PrismaClient){}

    async createVaccination(vaccination: Vaccinations): Promise<void> {
        
        await this.prisma.vaccinations.create({
            data: {
                date: vaccination.date,
                nextDate: vaccination.nextDate,
                pet: {connect: { id: vaccination.pet.id}},
                veterinarian: vaccination.veterinarianName,
                veterinarianCrmv: vaccination.veterinarianCrmv,
                vaccines: {connect: {id: vaccination.vaccine.id}}

            }
        })
    }

    async getVaccinationById(id: number): Promise<Vaccinations> {
        const vaccinationData = await this.prisma.vaccinations.findUnique({where: {id: id}, include: {pet: true, vaccines: true}})
        if (!vaccinationData) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        const vaccination = new Vaccinations({
                date: vaccinationData.date,
                nextDate: vaccinationData.nextDate,
                pet: new Pet({id: vaccinationData.pet.id, name: vaccinationData.pet.name, image: vaccinationData.pet.image, active: vaccinationData.pet.active}),
                veterinarianName: vaccinationData.veterinarian,
                veterinarianCrmv: vaccinationData.veterinarianCrmv,
                vaccine: 
                    new Vaccines({
                    id: vaccinationData.vaccines.id,
                    name: vaccinationData.vaccines.name,
                    expirationDate: vaccinationData.vaccines.expirationDate,
                    manufactureDate: vaccinationData.vaccines.manufactureDate,
                    batchNumber: vaccinationData.vaccines.batchNumber,
                    manufacturer: vaccinationData.vaccines.manufacturer
                })
                
        })
        return vaccination
    }

    async getAllVaccination(): Promise<Vaccinations[]> {
        const dataList = await this.prisma.vaccinations.findMany({include: {pet: true, vaccines: true}})
        const vaccinationsList = dataList.map((vaccination) => {
            return new Vaccinations({
                date: vaccination.date,
                nextDate: vaccination.nextDate,
                pet: new Pet({id: vaccination.pet.id, name: vaccination.pet.name, image: vaccination.pet.image, active: vaccination.pet.active}),
                veterinarianName: vaccination.veterinarian,
                veterinarianCrmv: vaccination.veterinarianCrmv,
                vaccine: new Vaccines({
                    id: vaccination.vaccines.id,
                    name: vaccination.vaccines.name,
                    expirationDate: vaccination.vaccines.expirationDate,
                    manufactureDate: vaccination.vaccines.manufactureDate,
                    batchNumber: vaccination.vaccines.batchNumber,
                    manufacturer: vaccination.vaccines.manufacturer
                })
            })
        })

        if (!vaccinationsList) {
            throw new VaccinationErrors("No vaccinations")
        }
        return vaccinationsList
    }

    async getAllVaccinesByPetId(id: number): Promise<Vaccinations[]> {
        const dataList = await this.prisma.vaccinations.findMany({where: {petId: id}, include: {pet: true, vaccines: true}})
        const vaccinationsList = dataList.map((vaccination) => {
            return new Vaccinations({
                date: vaccination.date,
                nextDate: vaccination.nextDate,
                pet: new Pet({id: vaccination.pet.id, name: vaccination.pet.name, image: vaccination.pet.image, active: vaccination.pet.active}),
                veterinarianName: vaccination.veterinarian,
                veterinarianCrmv: vaccination.veterinarianCrmv,
                vaccine: new Vaccines({
                    id: vaccination.vaccines.id,
                    name: vaccination.vaccines.name,
                    expirationDate: vaccination.vaccines.expirationDate,
                    manufactureDate: vaccination.vaccines.manufactureDate,
                    batchNumber: vaccination.vaccines.batchNumber,
                    manufacturer: vaccination.vaccines.manufacturer
                })
            })
        })

        if (!vaccinationsList) {
            throw new VaccinationErrors("No vaccinations")
        }
        return vaccinationsList
        
    }

    

    async getVaccinesByDateOrder(petId: number): Promise<Vaccinations[]> {
        const dataList = await this.prisma.vaccinations.findMany({where: {petId: petId}, include: {pet: true, vaccines: true}, orderBy: {nextDate: 'asc'}})
        const vaccinationsList = dataList.map((vaccination) => {
            return new Vaccinations({
                date: vaccination.date,
                nextDate: vaccination.nextDate,
                pet: new Pet({id: vaccination.pet.id, name: vaccination.pet.name, image: vaccination.pet.image, active: vaccination.pet.active}),
                veterinarianName: vaccination.veterinarian,
                veterinarianCrmv: vaccination.veterinarianCrmv,
                vaccine: new Vaccines({
                    id: vaccination.vaccines.id,
                    name: vaccination.vaccines.name,
                    expirationDate: vaccination.vaccines.expirationDate,
                    manufactureDate: vaccination.vaccines.manufactureDate,
                    batchNumber: vaccination.vaccines.batchNumber,
                    manufacturer: vaccination.vaccines.manufacturer
                })
            })
        })

        if (!vaccinationsList) {
            throw new VaccinationErrors("No vaccinations")
        }
        return vaccinationsList
    }

    async updateVaccination(vaccinationData: Vaccinations, id: number): Promise<void> {
        const vaccinationD = await this.getVaccinationById(id)
        if (!vaccinationD) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        await this.prisma.vaccinations.update({
            where: {id: id},
            data: {
                date: vaccinationData.date,
                nextDate: vaccinationData.nextDate,
            }
        })
        
    }

    async deleteVaccination(id: number): Promise<void> {
        const vaccinationD = await this.getVaccinationById(id)
        if (!vaccinationD) {
            throw new VaccinationErrors("No vaccination with this id")
        }
        await this.prisma.vaccinations.delete({where: {id: id}})
    }
}