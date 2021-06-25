import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guard/auth.guard';
import { OrdersComponent } from './orders.component';

const routes: Routes = [{ path: '', component: OrdersComponent, pathMatch: "full", canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
