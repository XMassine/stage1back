import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BiensComponent} from "./biens/biens.component";
import {ClientsComponent} from "./clients/clients.component";
import {DemandsComponent} from "./demands/demands.component";
import {OwnersComponent} from "./owners/owners.component";
import {NewClientComponent} from "./new-client/new-client.component";
import {NewOwnerComponent} from "./new-owner/new-owner.component";
import {UpdateClientComponent} from "./update-client/update-client.component";
import {UpdateOwnerComponent} from "./update-owner/update-owner.component";
import {CreateBienComponent} from "./create-bien/create-bien.component";
import {UpdateBienComponent} from "./update-bien/update-bien.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path:"biens",component:BiensComponent},
  {path:"clients",component:ClientsComponent},
  {path:"demands/:clientId",component:DemandsComponent},
  {path:"owners", component:OwnersComponent},
  {path:"new-client", component:NewClientComponent},
  {path: "new-owner", component:NewOwnerComponent},
  {path:"update-client/:id", component:UpdateClientComponent},
  {path:"update-owner/:id", component:UpdateOwnerComponent},
  {path:"crate-bien/:ownerid", component:CreateBienComponent},
  {path:"update-bien/:ownerId/:id", component:UpdateBienComponent},
  {path:"", component:ClientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
