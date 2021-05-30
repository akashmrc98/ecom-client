import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PRODUCT_API } from '../../config/http.config';
import { Product } from '../../model/product.model'
import { map, shareReplay } from 'rxjs/operators'
import { Review } from '@model/domain/review.model';

@Injectable({ providedIn: 'any' })
export class ProductService {
  constructor(private http: HttpClient) { }

  saveProduct(product: Product): Observable<any> {
    return this.http.post<any>(PRODUCT_API + "/", product)
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCT_API).pipe(map(products => products), shareReplay())
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(PRODUCT_API + "/" + id)
  }

  getReviews(id: number): Observable<Review[]> {
    return this.getProduct(id).pipe(map(product => product.reviews))
  }
}
