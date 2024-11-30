import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {OwnerService} from "../services/owner.service";
import {Owner} from "../models/owner.model";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Client} from "../models/client.model";

@Component({
  selector: 'app-update-owner',
  templateUrl: './update-owner.component.html',
  styleUrls: ['./update-owner.component.css']
})
export class UpdateOwnerComponent implements OnInit {

  updateOwnerFormGroup!:FormGroup;
  ownerId!:string | null;
  owner!:Owner
  constructor(private ownerService:OwnerService,
              private fb:FormBuilder,
              private route:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.ownerId = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.ownerId) {
      this.ownerService.getOwnerById(this.ownerId).subscribe({
        next:(ow:Owner) => {
          this.owner=ow;
          this.updateOwnerFormGroup=this.fb.group({
            name: this.fb.control(this.owner.name, [Validators.required, Validators.minLength(3)]),
            capital: this.fb.control(this.owner.capital, [Validators.required])
          })
        },
        error:err => {
          console.log("Error fetching client info", err);
        }
      })
    }
  }

  handleUpdateOwner() {
    if (this.updateOwnerFormGroup.valid && this.ownerId) {
      const updatedOwner: Owner = this.updateOwnerFormGroup.value;
      updatedOwner.id = Number(this.ownerId);  // Assuming the Client model has an 'id' field
      this.ownerService.updateOwner(updatedOwner).subscribe({
        next: () => {
          alert("Client updated successfully!");
          this.route.navigateByUrl("/owners");
        },
        error: err => {
          console.log("Error updating client:", err);
        }
      });
    }
  }
}
