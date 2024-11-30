import { Component, OnInit } from '@angular/core';
import {Client} from "../models/client.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../services/client.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  newClientFormGroup!:FormGroup;

  constructor(private fb:FormBuilder,
              private clientService:ClientService,
              private route:Router) { }

  ngOnInit(): void {
    this.newClientFormGroup=this.fb.group({
      name: this.fb.control(null, [Validators.required,Validators.minLength(3)]),
      capital: this.fb.control(null,[Validators.required])
    })
  }

  handleSaveClient() {
    let cl:Client=this.newClientFormGroup.value;
    this.clientService.saveClient(cl).subscribe({
      next: data =>{
        alert("Client saved successfully saved!")
        //this.newClientFormGroup.reset()
        this.route.navigateByUrl("/clients")
      },
      error:err => {
        console.log("error")
      }
    })

  }
}
