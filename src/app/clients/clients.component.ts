import { Component, OnInit } from '@angular/core';
import {ClientService} from "../services/client.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Client} from "../models/client.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
 client! :Observable<Array<Client>>;
 errorMessage! :string;
 searchFormGroup: FormGroup|undefined;
  constructor(private clientService:ClientService,
              private fb:FormBuilder,
              private route:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control("")
    })
    this.handleSearchClients();

  }


  handleSearchClients() {
    let kw=this.searchFormGroup?.value.keyword;
    this.client=this.clientService.searchClients(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }


  handleDeleteClient(c: Client) {
    let conf=confirm("Are you sure you want to delete this client");
    if(!conf) return;
    this.clientService.deleteClient(c.id).subscribe({
      next: data => {
        this.client=this.client.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data
          })
        )
      }, error:err => {
        console.log("error deleting client")
      }
    })
  }
}
