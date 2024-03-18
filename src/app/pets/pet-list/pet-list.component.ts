import { Component, OnDestroy, OnInit } from '@angular/core';
import { Pet } from '../pet.model';
import { Subscription } from 'rxjs';
import { OwnerService } from '../../owner/owner.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetService } from '../pet.service';
import { DataStorageService } from '../../data-storage.service';
import { Owner } from '../../owner/owner.model';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.css'
})
export class PetListComponent implements OnInit, OnDestroy{
  id: number;
  owner: Owner;
  pets: Pet[];
  subscription: Subscription

  constructor(private petService: PetService, private ownerService: OwnerService, private router: Router, private route: ActivatedRoute, private dataStorageService: DataStorageService){}

  ngOnInit(){
    this.dataStorageService.fetchPets(this.ownerService.getOwnerId()).subscribe();
    this.subscription = this.petService.petsChanged.subscribe(
      (pets: Pet[]) => {
        this.pets = pets;
      }
    )
    this.pets = this.petService.getPets();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
