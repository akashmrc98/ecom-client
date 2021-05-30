import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guard/auth.guard';
import { AddressCreatorComponent } from './address-creator.component';

const routes: Routes = [{ path: '', component: AddressCreatorComponent, canActivate: [AuthGuard], pathMatch: "full" }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressCreatorRoutingModule { }
