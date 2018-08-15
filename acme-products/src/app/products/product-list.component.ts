import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  //selector: 'pm-products', only need the selector if component is nested inside another component
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
  //providers: [ProductService]
})

export class ProductListComponent implements OnInit {

  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 5;
  showImage: boolean = true;
  errorMessage: string;

  filteredProducts: IProduct[];
  products: IProduct[]; 
   

  _listFilter: string;
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  //use constructor for dependency injection
  constructor(private productService: ProductService) {
    //this.filteredProducts = this.products;
  }

/* short hand for this:
private _productService;
constructor(productService: ProductService) {
  this._productService = productService;
}

*/


  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    //this.products = this.productService.getProducts(); //using service to get data
    //this.filteredProducts = this.products;

    //using observable for http response
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error => this.errorMessage = <any>error
    );

  }
}
