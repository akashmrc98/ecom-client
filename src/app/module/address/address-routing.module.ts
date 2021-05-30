import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@guard/auth.guard';
import { AddressComponent } from './address.component';

const routes: Routes = [
    { path: '', component: AddressComponent, canActivate: [AuthGuard], pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AddressRoutingModule { }