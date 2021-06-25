import { Directive, HostListener } from '@angular/core';
import { ProductService } from '@service/product/product.service';

@Directive({
  selector: '[appScroller]'
})
export class ScrollerDirective {

  @HostListener('window:scroll', ['$event'])
  productScroller(event, pageNo, pageSize, sortBy) {
    if ((event.path[1].window.scrollY + event.path[1].window.innerHeight) >= event.path[0].body.offsetHeight) {

    }
  }
}
