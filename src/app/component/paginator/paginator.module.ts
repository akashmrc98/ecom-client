import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { PaginatorComponent } from './paginator.component';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [SharedModule],
  exports: [PaginatorComponent]
})
export class PaginatorModule {
}
