import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from '../product';
import {ProductService} from '../product.service'



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products!: Product[];
  isloading:boolean=true;
  message: string ="";
  error :string ="";

  p_id : any
  pproductName : any
  pproductPrice : any
  pproductImageURL :any
  pproductDescription :any

  index! :number

  constructor(private ps:ProductService) { }

  ngOnInit(): void {
    this.getproducts();
   }

   autopopulate(index:number,pid:string,pname:string,pprice:number,pimage:string,pdescription:string) 
   {
    this.p_id = pid ;
    this.pproductName = pname ;
    this.pproductPrice = pprice ;
    this.pproductImageURL = pimage ;
    this.pproductDescription = pdescription ;

    this.index = index
    console.log(index);
   }

   updateproduct(updatedata:NgForm)    
    {
       this.ps.updateproduct(this.p_id,updatedata.value).subscribe(data =>
        {
          console.log(data);
        })
    }

      getproducts() 
      {
        this.isloading =true;
        this.ps.getproducts().subscribe(res => {
          if(!res.error) {
            console.log(res);
            this.isloading = false
        this.products = res.products;
        this.message ="products retrival successful"
          }
      else 
      {
        this.error = "failed to load the products"
      }
        },err =>  {
        this.error = "server error"
        this.isloading = false
      })
      }
     deleteproduct(product:Product) {
      this.isloading = true;
        const confirmation = confirm("Are you sure to delete the product????")
        
          this.ps.deleteProduct(product._id).subscribe(data =>
            {
              this.isloading = false;
            this.message = 'Product deleted successfully'
            },err => {
            this.error = "Server error"
          })
        }    


  }

 
