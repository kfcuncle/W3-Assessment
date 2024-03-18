import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OwnerComponent } from "./owner/owner.component";
import { OwnerDetailComponent } from "./owner/owner-detail/owner-detial.component";
import { PetsComponent } from "./pets/pets.component";
import { PetEditComponent } from "./pets/pet-edit/pet-edit.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/owner', pathMatch: 'full' },
    { path: 'pet/:id', component: PetsComponent, children: [
        { path: 'new', component: PetEditComponent },
        { path: ':id', component: PetEditComponent },
    ] },
    { path: 'owner', component: OwnerComponent , children: [
        { path: ':id', component: OwnerDetailComponent }
    ]}
]
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}