import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '@model/domain/image.model';
import { API } from 'config/http.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  saveImage(formData: FormData): Observable<Image> {
    return this.http.post<Image>(API + "/images", formData)
  }

  deleteImageByID(id: number): any {
    const params = new HttpParams()
    params.append("id", id.toString())
    return this.http.delete(API + "/images/" + { params })
  }
}
