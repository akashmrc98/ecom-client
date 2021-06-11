import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { TaskbarModule } from 'component/taskbar/taskbar.module';

import { PageNotfoundRoutingModule } from './page-notfound-routing.module';
import { PageNotfoundComponent } from './page-notfound.component';


@NgModule({
  declarations: [
    PageNotfoundComponent,
  ],
  imports: [
    SharedModule,
    TaskbarModule,
    PageNotfoundRoutingModule
  ]
})
export class PageNotfoundModule { }
