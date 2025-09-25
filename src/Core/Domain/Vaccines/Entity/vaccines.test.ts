import { describe, it, expect } from "vitest";
import { Vaccines, VaccinesProps } from "./Vaccines";

describe("Vaccines creation tests", () => {
   
    it('should succed in creating a vaccine', () => {

        const eDate = new Date()
        eDate.setDate(eDate.getDate() + 4)
        const mDate = new Date()

        const validVaccineData = {
            name: "Polivalente",
            expirationDate: eDate,
            manufactureDate: mDate,
            batchNumber: "34jdas",
            manufacturer: "Phizer"
        }
        const vaccine = new Vaccines(validVaccineData)
        expect(vaccine).toBeInstanceOf(Vaccines)
    })

    it('should fail at insert an expiration date earlier than manufacture date', () => {
        const badEDate = new Date()
        badEDate.setDate(badEDate.getDate() - 4)
        const mDate = new Date()

        const invalidVaccineData = {
            name: "Polivalente",
            expirationDate: badEDate,
            manufactureDate: mDate,
            batchNumber: "34jdas",
            manufacturer: "Phizer"
        }


        expect(() => new Vaccines(invalidVaccineData)).toThrow("The expiration date can't be earlier than the manufacture date");

    })
})