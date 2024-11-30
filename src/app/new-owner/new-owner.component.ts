import { Component, OnInit } from '@angular/core';
import {OwnerService} from "../services/owner.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Owner} from "../models/owner.model";

@Component({
  selector: 'app-new-owner',
  templateUrl: './new-owner.component.html',
  styleUrls: ['./new-owner.component.css']
})
export class NewOwnerComponent implements OnInit {

  newOwnerFormgroup!:FormGroup;

  constructor(private ownerService:OwnerService,
              private fb:FormBuilder,
              private route:Router) { }

  ngOnInit(): void {
    this.newOwnerFormgroup=this.fb.group({
      name:this.fb.control(null,[Validators.required,Validators.minLength(3)]),
      capital:this.fb.control(null,[Validators.required])
    })
  }

  handleSaveOwner() {
    let ow:Owner=this.newOwnerFormgroup.value;
    this.ownerService.saveOwner(ow).subscribe({
      next: data=>{
        alert("Owner has been saved")
        this.route.navigateByUrl("/owners")
      },
      error:err => {
        console.log("errored adding owner")
      }
    })
  }
}
