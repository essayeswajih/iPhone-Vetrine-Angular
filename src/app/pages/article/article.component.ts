import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articleForm!: FormGroup;
  article: any;
  constructor(private fb: FormBuilder,private productService: ProductService ,private route: ActivatedRoute,private router : Router ) { }

  ngOnInit(): void {
    //this.article = this.ProductService.getProductById();
    this.articleForm = this.fb.group({
      imgArt: ['https//example.com/imahe.jpg', Validators.required],
      nomArt: ['iphone 16', Validators.required],
      desArt: ['u wan write 1500 character here', Validators.required],
      codeArt: ['00000001I', Validators.required],
      puartArt: [999.9, [Validators.required, Validators.min(0)]],
      couleurArt: ['#D9D9D9', Validators.required]
    });

  }

  async onSubmit() {
    if (this.articleForm.valid) {
      // Handle form submission logic here
       this.productService.createProduct(this.articleForm.value).then(
        () => {
          alert("Product Created");
          this.router.navigateByUrl(`/`)
        }
       )
    }
    else{
      console.log("form not valid")
      console.log(this.articleForm.value);
    }
  }
}
