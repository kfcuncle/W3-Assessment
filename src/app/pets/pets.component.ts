import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pet } from './pet.model';
import { PetService } from './pet.service';
import { Owner } from '../owner/owner.model';
import { OwnerService } from '../owner/owner.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent implements OnInit{
  id: number;
  owner: Owner;
  constructor(private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private ownerService: OwnerService,
    private router: Router) {}

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.ownerService.setOwnerId(this.id);
      }
    )
    this.owner = this.ownerService.getOwner(this.id);
    
  }

  onNewPet() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
