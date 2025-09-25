import { Pet, PetProps } from "./Pet";
import { test, describe, it, expect } from "vitest"

describe('Pet entity tests', () => {
    const validData: PetProps = {
        name: 'Antônio',
        image: 'imageUrl'
    }
    const invalidData: PetProps = {
        name: 'A',
        image: 'imageUrl'
    }
    it('should succed in creating a new pet', () => {
        const pet = new Pet(validData)
        expect(pet).toBeInstanceOf(Pet)
    })

    it('should throw error if name has less than two chars', () => {
        const pet = new Pet(validData);
        
        expect(() => pet.changePetName('A')).toThrow("The name should have at least two characters")
    })
})