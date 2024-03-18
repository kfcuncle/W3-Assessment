import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PetService } from '../pet.service';
import { DataStorageService } from '../../data-storage.service';
import { Pet } from '../pet.model';
import { OwnerService } from '../../owner/owner.service';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrl: './pet-edit.component.css'
})
export class PetEditComponent implements OnInit {
  petForm: FormGroup;
  editMode = false;
  pet: Pet;
  id: number;
  ownerId: number;

  constructor(private route: ActivatedRoute, private petService: PetService, private ownerService: OwnerService, private router: Router, private dataStorageService: DataStorageService) {

  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  private initForm() {
    let name = '';
    let breed = '';

    if (this.editMode) {
      this.pet = this.petService.getPet(this.id);
      console.log(this.pet.id);
      name = this.pet.name;
      breed = this.pet.breed;
    }

    this.petForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'breed': new FormControl(breed, Validators.required),
    });
  }


  onSubmit() {
    if (this.editMode) {
      const pet = this.pet;
      pet.id = this.pet.id;
      pet.name = this.petForm.value.name;
      pet.breed = this.petForm.value.breed;
      this.petService.updatePet(this.id, pet);
      this.dataStorageService.editPet(this.petService.getPet(this.id));
    } else {
      this.petService.addPet(this.petForm.value)
      this.dataStorageService.storePet(this.petForm.value, this.ownerService.getOwnerId());
    }
    this.onCancel();
  }

  onCancel() {
    this.petForm.reset();
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDelete() {
    this.dataStorageService.deletePet(this.pet.id);
    this.petService.deletePet(this.id);
    this.onCancel();
  }

}
