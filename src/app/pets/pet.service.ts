import { Subject, retry } from "rxjs";
import { Pet } from "./pet.model";

export class PetService {
    petsChanged = new Subject<Pet[]>();
    startedEditing = new Subject<number>();
    private pets: Pet[];
    private ownerId: number;

    getPets() {
        return this.pets.slice();
    }

    getPet(index: number) {
        return this.pets[index];
    }

    setPets(pets: Pet[]) {
        this.pets = pets;
        this.petsChanged.next(this.pets.slice());
    }

    addPet(pet: Pet) {
        this.pets.push(pet);
        this.petsChanged.next(this.pets.slice());
    }

    addPets(pets: Pet[]){
        // for(let Pet of this.Pets){
        //     this.addPet(Pet);
        // }

        this.pets.push(...pets);
        this.petsChanged.next(this.pets.slice());
    }

    updatePet(index: number, newPet: Pet){
        this.pets[index] = newPet;
        this.petsChanged.next(this.pets.slice());
    }

    deletePet(index: number){
        this.pets.splice(index, 1);
        this.petsChanged.next(this.pets.slice());
    }
}