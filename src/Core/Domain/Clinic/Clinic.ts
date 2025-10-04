interface ClinicProps {
    id?: number;
    name: string;
    address: string;
}
export class Clinic {
    constructor(private props: ClinicProps){}

    get id() {
        return this.props.id;
    }

    get name() {
        return this.props.name;
    }

    get address() {
        return this.props.address;
    }

    changeName(name: string) {
        this.props.name = name;
    }

    changeAddress(address: string) {
        this.props.address = address;
    }

}