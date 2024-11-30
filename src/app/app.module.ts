import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ClientsComponent } from './clients/clients.component';
import { OwnersComponent } from './owners/owners.component';
import { BiensComponent } from './biens/biens.component';
import { DemandsComponent } from './demands/demands.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { NewClientComponent } from './new-client/new-client.component';
import { NewOwnerComponent } from './new-owner/new-owner.component';
import { UpdateClientComponent } from './update-client/update-client.component';
import { UpdateOwnerComponent } from './update-owner/update-owner.component';
import { NewBienComponent } from './new-bien/new-bien.component';
import { UpdateBienComponent } from './update-bien/update-bien.component';
import { CreateBienComponent } from './create-bien/create-bien.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClientsComponent,
    OwnersComponent,
    BiensComponent,
    DemandsComponent,
    NewClientComponent,
    NewOwnerComponent,
    UpdateClientComponent,
    UpdateOwnerComponent,
    NewBienComponent,
    UpdateBienComponent,
    CreateBienComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
