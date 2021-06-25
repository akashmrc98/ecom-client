import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API } from "../../config/http.config";
import { Address } from '@model/domain/address.model'

@Injectable({
  providedIn: 'any'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  saveAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(API + "/address", address)
  }

  removeAddressByID(id: number): void {
    const params: HttpParams = new HttpParams();
    params.append("id", id.toString())
    this.http.delete(API + "/address", { params })
  }


}


