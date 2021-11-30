import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Product } from './product'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {


  }

  getproducts() {
    return this.http.get<{ error: boolean, message: string, products: Product[] }>("https://ty-shop.herokuapp.com/api/products")
  }

  postproducts(data: any) {
    return this.http.post<{ error: boolean, message: string, products: Product }>("https://ty-shop.herokuapp.com/api/products", data)
  }

  deleteProduct(id: any) {
    return this.http.delete<{error:boolean,message:string,products:Product}>(`${environment.baseUrl}/${id}`)
  }

  updateproduct(id:any,product:any) {
    return this.http.put<{error:boolean,message:string,response:Product}>(`${environment.baseUrl}/${id}`,product)
  }
}
