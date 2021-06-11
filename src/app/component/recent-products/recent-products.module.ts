import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { RecentProductsComponent } from './recent-products.component';

@NgModule({
  declarations: [RecentProductsComponent],
  imports: [
    SharedModule
  ],
  exports: [RecentProductsComponent]
})
export class RecentProductsModule { }
