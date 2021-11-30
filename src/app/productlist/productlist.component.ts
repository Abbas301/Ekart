import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product';
import {ProductService} from '../product.service'

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  isloading :boolean=true
  message : string = "";
  error : string = ""

  constructor( private ps:ProductService) { }

  ngOnInit(): void {
    
  }

  onFormSubmit(addProductForm:NgForm) {
    this.isloading = true;
    console.log(addProductForm.value);
    this.ps.postproducts(addProductForm.value).subscribe(res =>
      {
        console.log(res);
        addProductForm.reset();
        this.isloading = false;
        if (!res.error) {
          this.message = "Product added successfully"
        }
        else {
          this.error = "Failed to add please add it again"
        }
      },err =>
      {
        this.error = "Server busy please try later"
      })
  }

}
