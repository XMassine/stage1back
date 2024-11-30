import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BienService} from "../services/bien.service";

@Component({
  selector: 'app-biens',
  templateUrl: './biens.component.html',
  styleUrls: ['./biens.component.css']
})
export class BiensComponent implements OnInit {

  bienFormGroup!:FormGroup;

  constructor(private fb:FormBuilder,
              private bienService:BienService) { }

  ngOnInit(): void {
    this.bienFormGroup=this.fb.group({
      bienId:this.fb.control(null,)
    })
  }

  handleSearchBien() {
    let bienId:number=this.bienFormGroup.value.bienId
    this.bienService.getBien(bienId)
  }
}
