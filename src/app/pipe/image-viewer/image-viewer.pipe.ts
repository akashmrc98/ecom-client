import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageViewer'
})
export class ImageViewerPipe implements PipeTransform {

  transform(image: Blob): string {
    return "data:image/jpeg;base64," + image
  }

}
