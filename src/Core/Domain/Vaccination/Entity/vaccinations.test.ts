import { describe, it, expect } from "vitest";
import { VaccinationsProps } from "./Vaccinations";
import { Vaccinations } from "./Vaccinations";
import { PetProps, Pet } from "../../Pet/Entity/Pet";
import { VeterinariansProps, Veterinarians } from "../../Veterinarian/Entity/Veterinarians";


describe("Vaccination tests", () => {

    it('should be able to create a new vaccination', () => {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + 4)

        const validData: PetProps = {
            name: 'Antônio',
            image: 'imageUrl'
        }

        const pet = new Pet(validData)

        const veterinarianData: VeterinariansProps = {
            name: 'Hugo',
            crmv: '12345',
        }
        const veterinarian = new Veterinarians(veterinarianData)

        const validVaccinationData: VaccinationsProps = {
            date: new Date(),
            nextDate: nextDate,
            pet: pet,
            veterinarian: veterinarian
        }

        expect(() => new Vaccinations(validVaccinationData)).not.toThrow()
    })

    it('should not be able to add a next dose date earlier than/equal to the first date', () => {
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() - 4)

        const validData: PetProps = {
            name: 'Antônio',
            image: 'imageUrl'
        }

        const pet = new Pet(validData)

        const veterinarianData: VeterinariansProps = {
            name: 'Hugo',
            crmv: '12345',
        }
        const veterinarian = new Veterinarians(veterinarianData)

        const validVaccinationData: VaccinationsProps = {
            date: new Date(),
            nextDate: nextDate,
            pet: pet,
            veterinarian: veterinarian
        }

       
        expect(() => new Vaccinations(validVaccinationData)).toThrow("The next date must be after the administration date")

    })

   
})