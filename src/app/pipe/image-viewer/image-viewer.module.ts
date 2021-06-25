import { NgModule } from '@angular/core';
import { ImageViewerPipe } from './image-viewer.pipe';

@NgModule({
  declarations: [ImageViewerPipe],
  exports: [ImageViewerPipe]
})
export class ImageViewerModule { }
