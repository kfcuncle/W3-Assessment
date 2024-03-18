import { Pet } from "../pets/pet.model";

export class Owner{
    public id: number;
    public firstName: string;
    public lastName: string;
    public dateCreated: Date;
    public dateModified: Date;
    public pets?: Pet[];

    constructor(id: number, firstName: string, lastName: string, dateCreated: Date, dateModified: Date, pets?: Pet[]){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateCreated = dateCreated;
        this.dateModified = dateModified;
        this.pets = pets;
    }
}