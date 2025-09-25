import { describe, expect, it } from "vitest";
import { Veterinarians, VeterinariansProps } from "./Veterinarians";


describe('Veterinarian insertion tests', () => {

    it('should succesfully create a veterinarian', () => {
        const veterinarianData: VeterinariansProps = {
            name: 'Hugo',
            crmv: '12345',
        }
        const veterinarian = new Veterinarians(veterinarianData)

        expect(veterinarian).toBeInstanceOf(Veterinarians)
    })

    it('should not be able to insert invalid crmv', () => {
        const veterinarianData: VeterinariansProps = {
            name: 'Hugo',
            crmv: '123',
        }

        expect(() => new Veterinarians(veterinarianData)).toThrow("Insert a valid CRMV number")
    })
})