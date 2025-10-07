import { beforeEach, describe, expect, it } from "vitest";
import { Clinic, ClinicProps } from "./Clinic";
import { Address } from "../ValueObjects/Address";

describe('Clinic tests', () => {
    
    it('should be able to create a clinic', () => {
        const street = 'Luisanta'
        const number = '34b'
        const validAddress = new Address(street, number)
        const clinic = new Clinic({
            id: 1,
            name: 'Bogus',
            address: validAddress
        })

        expect(clinic).toBeInstanceOf(Clinic);
    })

    it('should throw an error for invalid addres', () => {

        const street = ''
        const number = '34b'
        expect(() => new Address(street, number)).toThrowError("Street and number required")
    })

    it('should throw an error for invalid name', () => {
        const street = 'Luisanta'
        const number = '34b'
        const validAddress = new Address(street, number)
        const clinic = new Clinic({
            id: 1,
            name: 'Bogus',
            address: validAddress
        })

        expect(() => new Clinic({id: 1, name: '', address: validAddress}))
        .toThrowError("The name cant have only 2 characters")
    })
})