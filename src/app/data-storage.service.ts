import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { OwnerService } from './owner/owner.service';
import { Owner } from './owner/owner.model';
import { PetService } from './pets/pet.service';
import { Pet } from './pets/pet.model';
import { environment } from './environment/environment';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class DataStorageService {
    
    constructor(private http: HttpClient, private ownerService: OwnerService, private petService: PetService) { }

    storeOwner(owner: Owner) {
        console.log(owner);
        this.http
            .post(
                environment.baseUrl + '/owner',
                owner
            )
            .subscribe(response => {
                this.fetchOwners().subscribe();
            });
    }

    fetchOwners() {
        return this.http.get<Owner[]>(
            environment.baseUrl + '/owner'
        ).pipe(
            tap(owners => { 
                this.ownerService.setOwner(owners);
            })
        );
    }

    fetchPets(id: number) {
        return this.http.get<Pet[]>(
            environment.baseUrl + '/pet/pets/' + id
            
        ).pipe(
            tap(pets => { 
                this.petService.setPets(pets);
            })
        );
    }

    storePet(pet: Pet, id: number): Observable<any> {
        return this.http.post(environment.baseUrl + '/pet/' + id,pet)
    }

    editPet(pet: Pet) {
        this.http
            .put(
                environment.baseUrl + '/pet',
                pet
            )
            .subscribe(response => {
                console.log(response);
            });
    }

    deletePet(id: number) {
        this.http
            .delete(
                environment.baseUrl + '/pet/' + id,
            )
            .subscribe(response => {
                console.log(response);
            });
    }
}