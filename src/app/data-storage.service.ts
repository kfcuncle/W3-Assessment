import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { OwnerService } from './owner/owner.service';
import { Owner } from './owner/owner.model';
import { PetService } from './pets/pet.service';
import { Pet } from './pets/pet.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private ownerService: OwnerService, private petService: PetService) { }

    storeOwner() {
        const owner = this.ownerService.getOwners()
        this.http
            .put(
                'http://localhost:8080/owner',
                owner
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchOwners() {
        return this.http.get<Owner[]>(
            'http://localhost:8080/owner'
        ).pipe(
            tap(owners => { 
                this.ownerService.setOwner(owners);
            })
        );
    }

    fetchPets(id: number) {
        return this.http.get<Pet[]>(
            'http://localhost:8080/pet/pets/' + id
            
        ).pipe(
            tap(pets => { 
                this.petService.setPets(pets);
            })
        );
    }

    storePet(pet: Pet, id: number) {
        this.http
            .post(
                'http://localhost:8080/pet/' + id,
                pet
            )
            .subscribe(response => {
                this.fetchPets(id).subscribe();
            });
    }

    editPet(pet: Pet) {
        this.http
            .put(
                'http://localhost:8080/pet',
                pet
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    deletePet(id: number) {
        this.http
            .delete(
                'http://localhost:8080/pet/' + id,
            )
            .subscribe(response => {
                console.log(response);
            });
    }
}