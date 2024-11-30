import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bien} from "../models/bien.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BienService {

  constructor(private http:HttpClient) { }

  public getBien(bienId: number):Observable<Bien>{
    return this.http.get<Bien>(environment.backendHost+ "/biens/"+bienId)
  }

  deleteBien(id: number) {
    return this.http.delete(environment.backendHost+"/biens/"+id)
  }

  saveBien(b: Bien, ownerId: string) {
    return this.http.post<Bien>(environment.backendHost+"/biens/"+ownerId,b)
  }

  getBienById(id: number) {
    return this.http.get<Bien>(environment.backendHost+"/biens/"+id)
  }

  updateBien(updatedBien: Bien, ownerId: string | null) {
    return this.http.put<Bien>(environment.backendHost+"/"+ownerId+"/biens/"+updatedBien.id,updatedBien)
  }
}
