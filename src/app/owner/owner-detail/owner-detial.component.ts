import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Owner } from "../owner.model";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { OwnerService } from "../owner.service";

@Component({
    selector: 'app-owner-detail',
    templateUrl: './owner-detail.component.html',
    styleUrl: './owner-detail.component.css'
})
export class OwnerDetailComponent implements OnInit {
    ownerForm: FormGroup;
    owner: Owner;
    id: number;

    constructor(
        private route: ActivatedRoute,
        private ownerService: OwnerService,
        private router: Router
        ) {

    }

    ngOnInit() {
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.owner = this.ownerService.getOwner(this.id);
            }
        )
    }

    onPet() {
        this.router.navigate(["/pet", this.owner.id]);
    }
}