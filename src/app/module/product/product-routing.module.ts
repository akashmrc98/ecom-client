import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guard/auth.guard';
import { ProductComponent } from './product.component';

const routes: Routes = [{ path: '', component: ProductComponent, pathMatch: "full", canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
