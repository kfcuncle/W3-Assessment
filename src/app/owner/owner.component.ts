import { Component } from '@angular/core';
import { DataStorageService } from '../data-storage.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent {
  constructor(private dataStorageService: DataStorageService){}

  ngOnInit() {
    this.dataStorageService.fetchOwners().subscribe(response => {
      console.log(response);
      
    });
  }
}
