import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Owner } from "../owner.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { OwnerService } from "../owner.service";
import { first } from "rxjs";
import { DataStorageService } from "../../data-storage.service";

@Component({
    selector: 'app-owner-detail',
    templateUrl: './owner-detail.component.html',
    styleUrl: './owner-detail.component.css'
})
export class OwnerDetailComponent implements OnInit {
    ownerForm: FormGroup;
    owner: Owner;
    id: number;
    editMode = false;

    constructor(
        private route: ActivatedRoute,
        private ownerService: OwnerService,
        private dataStorageService: DataStorageService,
        private router: Router
        ) {

    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm()
                this.owner = this.ownerService.getOwner(this.id);
            }
        )
    }

    private initForm() {
        let firstName = '';
        let lastName = '';
    
        if (this.editMode) {
          this.owner = this.ownerService.getOwner(this.id);
          firstName = this.owner.firstName;
          lastName = this.owner.lastName;
        }
    
        this.ownerForm = new FormGroup({
          'firstName': new FormControl(firstName, Validators.required),
          'lastName': new FormControl(lastName, Validators.required),
        });
      }

    onSubmit() {
        this.ownerService.addOwner(this.ownerForm.value)
        this.dataStorageService.storeOwner(this.ownerForm.value);
        this.onCancel();
      }

    onCancel() {
        this.ownerForm.reset();
        this.editMode = false;
        this.router.navigate(['../'], { relativeTo: this.route });
    }
    
    onPet() {
        this.router.navigate(["/pet", this.owner.id]);
    }
}