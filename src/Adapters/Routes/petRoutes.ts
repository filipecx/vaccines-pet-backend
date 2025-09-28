import express from 'express'
import { getAllPets, getPet, createPet, changeActive, updatePet, deletePet } from '../Controllers/Pet/petController.ts'
const router = express.Router()

router.get('/pets', getAllPets)
router.get('/pets/:id', getPet)
router.post('/pets', createPet)
router.patch('/pets/:id', changeActive)
router.put('/pets/:id', updatePet)
router.delete('/pets/:id', deletePet)
    
export default router
/*
export class PetRoutes {
    constructor(private petController: PetController){} 

    async getAllPets(): Promise<void> {
        router.get('/pets', this.petController.getAllPets)
    }

    async getPetById(): Promise<void> {
        router.get(`/pets/:id`, this.petController.getPet)
    }

    async createPet(): Promise<void> {
        router.post('/pets', this.petController.createPet)
    }

    async updatePet(): Promise<void> {
        router.put('/pets/:id', this.petController.updatePet)
    }

    async changeActive(): Promise<void> {
        router.patch('/pets/:id', this.petController.changeActive)
    }

    async deletePet() {
        router.delete('/pets/:id', this.petController.deletePet)
    }

}
    */