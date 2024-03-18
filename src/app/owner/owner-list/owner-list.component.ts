import { Component } from '@angular/core';
import { Owner } from '../owner.model';
import { Subscription } from 'rxjs';
import { OwnerService } from '../owner.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrl: './owner-list.component.css'
})
export class OwnerListComponent {
  owners: Owner[];
  subscription: Subscription

  constructor(private ownerService: OwnerService, private router: Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.subscription = this.ownerService.ownersChanged.subscribe(
      (owners: Owner[]) => {
        this.owners = owners;
      }
    )
    this.owners = this.ownerService.getOwners();
    console.log(this.owners);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  
}

