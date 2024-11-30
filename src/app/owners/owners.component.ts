import { Component, OnInit } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {Owner} from "../models/owner.model";
import {OwnerService} from "../services/owner.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Bien} from "../models/bien.model";
import {BienService} from "../services/bien.service";


@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.css']
})
export class OwnersComponent implements OnInit {
  owners!:Observable<Array<Owner>>
  searchOwnersFormGroup:FormGroup|undefined
  errorMessage!: string;
  biens!: Observable<Array<Bien>>
  errorMessageBiens!:string;
  thwOwner!:Owner
  ownerId!:number;


  constructor(private ownerService:OwnerService,
              private fb:FormBuilder,
              private bienService: BienService) { }

  ngOnInit(): void {
    this.searchOwnersFormGroup=this.fb.group({
      keyword:this.fb.control("")
    })
    this.handleSearch()
    this.initBiens(this.thwOwner.id)
  }

  handleSearch() {
    let kw=this.searchOwnersFormGroup?.value.keyword;
    this.owners=this.ownerService.searchOwners(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }


  handleDeleteOwner(owner: Owner) {
    let conf=confirm("Are you sure you want to delete this owner?");
    if (!conf) return;
    this.ownerService.deleteOwner(owner.id).subscribe({
      next:data => {
        this.owners=this.owners.pipe(
          map(data=>{
            let index=data.indexOf(owner);
            data.slice(index,1)
            return data
          })
        )
      },
      error:err => {
        console.log("error deleting owner")
      }
    })

  }


  initBiens(id: number) {
    this.ownerId=id
    this.biens=this.ownerService.getBiensByOwnerId(id).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );
  }

  handledeleteBien(bien: Bien) {
    let conf=confirm("Are you sure you want to delete this bien?");
    if (!conf) return;
    this.bienService.deleteBien(bien.id).subscribe({
      next:data => {
        this.biens=this.biens.pipe(
          map(data=>{
            let index=data.indexOf(bien);
            data.slice(index,1)
            return data
          })
        )
      },
      error:err => {
        console.log("error deleting bien")
      }
    })
  }
}
