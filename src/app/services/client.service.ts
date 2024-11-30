import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Client} from "../models/client.model";
import {environment} from "../../environments/environment";
import {ClientsComponent} from "../clients/clients.component";

@Injectable({
  providedIn: 'root' //no need to declare in providers
})
export class ClientService {

  constructor(private htpp:HttpClient) {}

  public getClients():Observable<Array<Client>>{
    return this.htpp.get<Array<Client>>(environment.backendHost +"/clients")
  }

  public searchClients(keyword:string):Observable<Array<Client>>{
    return this.htpp.get<Array<Client>>(environment.backendHost +"/clients/search?keyword="+keyword)
  }
  public saveClient(cl:Client):Observable<Client>{
    return this.htpp.post<Client>(environment.backendHost +"/clients", cl)
  }

  public deleteClient(id: number){
    return this.htpp.delete(environment.backendHost +"/clients/"+id)
  }

  public getClient(id: string | null):Observable<Client>{
    return this.htpp.get<Client>(environment.backendHost+"/clients/"+id)
  }

  public updateClient(cl:Client){
    return this.htpp.put<Client>(environment.backendHost +"/clients/"+ cl.id,cl)
  }

}
