import { Vaccines } from "../Entity/Vaccines"

export interface VaccinesRepository {
    create(vaccine: Vaccines): Promise<Vaccines>
    getAll(): Promise<Vaccines[]>
    getbyId(id: number): Promise<Vaccines>
    update(id: number, vaccine: Vaccines): Promise<void>
    delete(id: number): Promise<void>
}