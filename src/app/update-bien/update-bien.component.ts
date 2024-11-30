import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Client} from "../models/client.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BienService} from "../services/bien.service";
import {Bien} from "../models/bien.model";

@Component({
  selector: 'app-update-bien',
  templateUrl: './update-bien.component.html',
  styleUrls: ['./update-bien.component.css']
})
export class UpdateBienComponent implements OnInit {

  updateBienFormgroup!: FormGroup
  bienId!:String|null;
  bien!:Bien
  ownerId!:string | null;

  constructor(private activatedRoute: ActivatedRoute,
              private fb:FormBuilder,
              private router:Router,
              private bienService:BienService) { }

  ngOnInit(): void {
    this.bienId = this.activatedRoute.snapshot.paramMap.get("id");
    this.ownerId = this.activatedRoute.snapshot.paramMap.get("ownerId");
    let x:number=Number(this.bienId)
    this.bienService.getBienById(x).subscribe({
      next: (b: Bien) => {
        this.bien = b;
        this.updateBienFormgroup = this.fb.group({
          nom: this.fb.control(b.nom, [Validators.required, Validators.minLength(3)]),
          description: this.fb.control(b.description,[Validators.required]),
          prixPerMonth: this.fb.control(b.prixPerMonth,[Validators.required])
        });
      },
      error: err => {
        console.log("Error fetching client info", err);
      }
    });
  }

  handleUpdateBien() {
    if (this.updateBienFormgroup.valid && this.bienId) {
      const updatedBien: Bien = this.updateBienFormgroup.value;
      updatedBien.id = Number(this.bienId);  // Assuming the Client model has an 'id' field
      this.bienService.updateBien(updatedBien,this.ownerId).subscribe({
        next: () => {
          alert("Client updated successfully!");
          this.router.navigateByUrl("/owners");
        },
        error: err => {
          console.log("Error updating client:", err);
        }
      });
    }
  }
}
