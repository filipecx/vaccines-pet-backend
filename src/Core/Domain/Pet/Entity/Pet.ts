import { EditPetError } from "./Errors/EditPetError";

export interface PetProps {
    id?: number;
    name: string;
    image: string;
    active?: boolean;

}

export class Pet implements PetProps {
    private props: PetProps

    get id ():number | undefined {
        return this.props.id;
    }

    get name():string {
        return this.props.name
    }

    get image():string {
        return this.props.image
    }

    get active():boolean | undefined {
        return this.props.active
    }

    validateName(name: string) {
        if (name.length < 2) {
            throw new EditPetError('The name should have at least two characters')
        }
    }

    changePetName(newName: string) {
        this.validateName(newName)
        this.props.name = newName;
    }

    changePetImage(newImage: string) {
        this.props.image = newImage
    }

    changePetActive(newStatus: boolean) {
        this.props.active = newStatus
    }


    constructor (props: PetProps) {
        this.validateName(props.name)
        this.props = {
            ...props, active: props.active?? true
        }
    }
        
}

