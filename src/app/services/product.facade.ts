import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { AppServiceService } from "./app-service.service";
import { ProductDTO } from "../models/models";

@Injectable({
  providedIn: 'root'
})
export class ProductFacade{
  products$ : ReplaySubject<ProductDTO[]> = new ReplaySubject(1);
  constructor(private service: AppServiceService){ 
    this.service.getAllProducts().
      subscribe((products: ProductDTO[]) => this.products$.next(products));
  }
  getProductById(id : number) {
    this.service.getProductById(id).subscribe();
  }
}