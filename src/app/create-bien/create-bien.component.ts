import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BienService} from "../services/bien.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Bien} from "../models/bien.model";

@Component({
  selector: 'app-create-bien',
  templateUrl: './create-bien.component.html',
  styleUrls: ['./create-bien.component.css']
})
export class CreateBienComponent implements OnInit {

  newBienFormgroup!:FormGroup;
  ownerId!:string | null;
  bien!:Bien;

  constructor(private activatedRoute: ActivatedRoute,
              private fb:FormBuilder,
              private bienService:BienService,
              private router:Router) { }

  ngOnInit(): void {
    this.ownerId = this.activatedRoute.snapshot.paramMap.get("ownerid");
    this.newBienFormgroup=this.fb.group({
      nom: this.fb.control(null, [Validators.required,Validators.minLength(3)]),
      description: this.fb.control(null,[Validators.required]),
      prixPerMonth: this.fb.control(0,[Validators.required])
    })


  }

  handleSaveBien() {
    if(this.ownerId){
      let b:Bien=this.newBienFormgroup.value;
      this.bienService.saveBien(b,this.ownerId).subscribe({
        next: data =>{
          alert("Bien saved successfully saved!")
          this.router.navigateByUrl("/owners")
        },
        error:err => {
          console.log("error")
        }
      })
    }
  }
}
