import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PRODUCT_API } from '../../config/http.config';
import { Product } from '@model/domain/product.model'
import { map, shareReplay } from 'rxjs/operators'
import { Review } from '@model/domain/review.model';
import { ProductList } from '@model/domain/ProductList.model';

@Injectable({ providedIn: 'any' })
export class ProductService {
  constructor(private http: HttpClient) { }

  saveProduct(product: Product): Observable<any> {
    return this.http.post<any>(PRODUCT_API + "/", product)
  }

  getProducts(pageNo: number, pageSize: number, sortBy: string): Observable<ProductList[]> {
    const params = `?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}`
    return this.http.get<ProductList[]>(PRODUCT_API + params).pipe(map(products => products), shareReplay())
  }

  getProductsSize(): Observable<number> {
    const params = `/size`
    return this.http.get<number>(PRODUCT_API + params).pipe(map(products => products), shareReplay())
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(PRODUCT_API + "/" + id)
  }

  getReviews(id: number): Observable<Review[]> {
    return this.getProduct(id).pipe(map(product => product.reviews))
  }
}
