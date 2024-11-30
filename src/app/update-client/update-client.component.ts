import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {Client} from "../models/client.model";
import {ClientService} from "../services/client.service";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  clientId!: string | null;
  client!: Client;
  updateClientFormGroup!: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private clientService: ClientService,
              private fb: FormBuilder,
              private route: Router) {
  }

  ngOnInit(): void {
    this.clientId = this.activatedRoute.snapshot.paramMap.get("id");
      this.clientService.getClient(this.clientId).subscribe({
        next: (cl: Client) => {
          this.client = cl;
          this.updateClientFormGroup = this.fb.group({
            name: this.fb.control(this.client.name, [Validators.required, Validators.minLength(3)]),
            capital: this.fb.control(this.client.capital, [Validators.required])
          });
        },
        error: err => {
          console.log("Error fetching client info", err);
        }
      });
  }
  handleUpdateClient() {
    if (this.updateClientFormGroup.valid && this.clientId) {
      const updatedClient: Client = this.updateClientFormGroup.value;
      updatedClient.id = Number(this.clientId);  // Assuming the Client model has an 'id' field
      this.clientService.updateClient(updatedClient).subscribe({
        next: () => {
          alert("Client updated successfully!");
          this.route.navigateByUrl("/clients");
        },
        error: err => {
          console.log("Error updating client:", err);
        }
      });
    }
  }
}
