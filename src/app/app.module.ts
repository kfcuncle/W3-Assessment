import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OwnerComponent } from './owner/owner.component';
import { OwnerListComponent } from './owner/owner-list/owner-list.component';
import { OwnerDetailComponent } from './owner/owner-detail/owner-detial.component';
import { PetsComponent } from './pets/pets.component';
import { PetListComponent } from './pets/pet-list/pet-list.component';
import { PetEditComponent } from './pets/pet-edit/pet-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OwnerService } from './owner/owner.service';
import { PetService } from './pets/pet.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    OwnerComponent,
    OwnerListComponent,
    OwnerDetailComponent,
    PetsComponent,
    PetListComponent,
    PetEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [OwnerService, PetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
