import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { StoreModule } from '@ngrx/store';

import { TaskbarComponent } from './taskbar.component';
import * as fromTaskBarStore from '@store/taskbar/taskbar.reducer'

@NgModule({
  declarations: [TaskbarComponent],
  imports: [
    SharedModule,
    RouterModule,
    StoreModule.forFeature(fromTaskBarStore.key, fromTaskBarStore.taskBarReducer)
  ],
  exports: [
    TaskbarComponent,
  ]
})
export class TaskbarModule { }
