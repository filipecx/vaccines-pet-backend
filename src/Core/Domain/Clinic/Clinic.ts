import { InvalidClinicNameError } from './Erros/InvalidClinicNameError'
import { CreateClinicError } from './Erros/CreateClinicError'
import { Address } from '../ValueObjects/Address';

export interface ClinicProps {
    id?: number;
    address: Address;
    name: string;
}

export class Clinic {
    
    constructor(private props: ClinicProps) {
        this.validateName(props.name);
    }

    get id() {
        return this.props.id
    }

    get address() {
        return this.props.address
    }

    get name() {
        return this.props.name
    }

    changeAddress(street: string, number: string) {
        this.props.address.number = number;
        this.props.address.street = street;
    }

    validateName(name: string) {
        if (name.length < 3) {
            throw new InvalidClinicNameError('The name cant have only 2 characters')
        }
    }

}