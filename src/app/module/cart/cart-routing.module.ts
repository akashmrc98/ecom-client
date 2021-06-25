import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guard/auth.guard';
import { CartComponent } from './cart.component';

const routes: Routes = [{ path: '', component: CartComponent, canActivate: [AuthGuard], pathMatch: "full" }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
