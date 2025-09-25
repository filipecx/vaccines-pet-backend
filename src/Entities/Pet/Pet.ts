export interface PetProps {
    id?: number;
    name: string;
    image: string;
    active: boolean;

}

export class Pet implements PetProps {
    private props: PetProps

    get id ():number {
        return this.id;
    }

    get name():string {
        return this.name
    }

    get image():string {
        return this.image
    }

    get active():boolean {
        return this.active
    }

    changePetName(newName: string) {
        this.props.name = newName;
    }

    changePetImage(newImage: string) {
        this.props.image = newImage
    }

    changePetActive(newStatus: boolean) {
        this.props.active = newStatus
    }


    constructor (props: PetProps) {
        this.props = props
    }
}

