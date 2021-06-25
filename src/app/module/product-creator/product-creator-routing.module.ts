import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guard/auth.guard';
import { ProductCreatorComponent } from './product-creator.component';

const routes: Routes = [{ path: '', component: ProductCreatorComponent, pathMatch: "full", canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductCreatorRoutingModule { }
