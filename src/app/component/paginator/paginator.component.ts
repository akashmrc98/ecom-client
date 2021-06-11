import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductService } from '@service/product/product.service';

import * as fromProductActions from '@store/product/product.actions'
import * as fromProductSelectors from '@store/product/product.selector'


@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {


  constructor(
    private productService: ProductService,
    private productStore: Store<fromProductSelectors.ProductFeature>
  ) { }

  productPerPage: number = 4;
  @Input() isLoading: boolean;

  ngOnInit(): void {
    this.getProductsSize()
    this.productService.getProductsSize()
      .subscribe(total => {
        const pageSize: number[] = []
        let count = 0;
        while (Math.round(total / this.productPerPage) > 0) {
          pageSize.push(count)
          count = count + 1;
          total /= this.productPerPage
          total = Math.round(total)
        }
        this.pageSize = pageSize
      })
  }

  pageSize = []

  getProducts(index: number) {
    this.productService.getProducts(index, this.productPerPage, "")
      .subscribe(products => {
        this.productStore.dispatch(fromProductActions.products({ products: products }))
        window.scroll(0, 0)
      })
  }

  getProductsSize() {
  }
}
