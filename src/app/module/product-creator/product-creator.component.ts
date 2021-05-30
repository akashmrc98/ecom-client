import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Image } from '@model/image.model';
import { Product } from '@model/product.model';
import { ImageService } from '@service/image/image.service';
import { ProductService } from '@service/product/product.service';

@Component({
  selector: 'app-product-creator',
  templateUrl: './product-creator.component.html',
  styleUrls: ['./product-creator.component.scss']
})
export class ProductCreatorComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void { }

  productForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    manufacturedOn: new FormControl(null, [Validators.required]),
    brand: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    stock: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required])
  })

  images: Image[] = []
  specs: string[] = []
  product: Product = null;
  spec: string = ''
  categoryList: string[] = ['Electronics', 'Digital', 'Art'];
  picker: any;

  getFormField(field: string): any {
    return this.productForm.get(field).value
  }

  onSave() {
    let product: Product = {
      manufacturedOn: this.getFormField("manufacturedOn"),
      brand: this.getFormField("brand"),
      category: this.getFormField("category"),
      description: this.getFormField("description"),
      stock: this.getFormField("stock"),
      price: this.getFormField("price"),
      images: this.images,
      specifications: this.specs,
    }
    this.productService.saveProduct(product).subscribe(
      (next) => { console.log(next) },
      (error) => { console.log(error) }
    )
  }

  addSpec() {
    if (this.spec !== "")
      this.specs.push(this.spec)
  }

  removeSpec(specIndex: number) {
    this.specs.splice(specIndex, 1);
  }

  deleteImage(id: number) {
    this.imageService.deleteImageByID(id)
    let images = this.images
    const index = images.findIndex((img) => {
      if (img.id === id) {
        return id
      }
      return null;
    })
    images.splice(index, 1)
    this.images = images
  }

  handleFileInput(fileList: any) {
    const file: File = fileList.target.files[0]

    if (file) {
      const formData: FormData = new FormData();
      formData.append('image', file);
      this.imageService.saveImage(formData)
        .subscribe(
          (next) => {
            this.images.push(next)
          },
          (error) => {
            console.log(error)
          }
        )
    }
  }

}
