import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Owner} from "../models/owner.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Bien} from "../models/bien.model";

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  constructor(private http:HttpClient) { }


  public getOwners():Observable<Array<Owner>>{
    return this.http.get<Array<Owner>>(environment.backendHost +"/owner")
  }

  searchOwners(kw: string):Observable<Array<Owner>> {
    return this.http.get<Array<Owner>>(environment.backendHost+"/owners/search?keyword="+kw)
  }

  deleteOwner(id: number) {
    return this.http.delete(environment.backendHost+"/owners/"+id);
  }

  saveOwner(ow: Owner) {
    return this.http.post(environment.backendHost+"/owners",ow)
  }

  getBiensByOwnerId(id: number):Observable<Array<Bien>>{
    return this.http.get<Array<Bien>>(environment.backendHost+"/owners/"+id+"/biens")
  }

  getOwnerById(id: string) {
    return this.http.get<Owner>(environment.backendHost+"/owners/"+id);
  }

  updateOwner(updatedOwner: Owner) {
    return this.http.put(environment.backendHost+"/owners/"+updatedOwner.id,updatedOwner)
  }
}
