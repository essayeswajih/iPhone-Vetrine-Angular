import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent implements OnInit {
  id:any = this.route.snapshot.paramMap.get('id');
  articleForm1: FormGroup = this.fb.group({
    imgArt: ['', Validators.required],
    nomArt: ['', Validators.required],
    desArt: ['', Validators.required],
    codeArt: ['', Validators.required],
    puartArt: [0, [Validators.required, Validators.min(0)]],
    couleurArt: ['#D9D9D9', Validators.required],
    idArt : [this.id, Validators.required]
  });
  article: any;
  API_URL = "product";
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    
    if (isNaN(parseInt(this.id, 10))) {
      // Handle invalid id
      return;
    }
    console.log("id :"+this.id)

    try {
      this.productService.getProductById(this.id).then(
        (data) => {
          this.article = data.data.Article;
          console.log(this.article)
          this.articleForm1.patchValue({
            imgArt: this.article.imgArt,
            nomArt: this.article.nomArt,
            desArt: this.article.desArt,
            codeArt: this.article.codeArt,
            puartArt: this.article.puartArt,
            couleurArt: this.article.couleurArt,
            idArt : this.id
          });
          console.log(this.article)
        console.log(this.articleForm1.value)
        }
      );

      
    } catch (error) {
      // Handle error (e.g., show a notification to the user)
      console.error('Error fetching article:', error);
    }
  }

  onSubmit() {
    console.log(this.articleForm1.value)
    if (this.articleForm1.valid) {
      // Handle form submission logic here
      console.log(this.articleForm1.value);
      this.productService.createProduct(this.articleForm1.value).then(
        (data) => {
          alert("Phone Updated")
          this.router.navigateByUrl(`/`)
        },
        (error) => {
          console.log(error)
        }
        
      );
    }
    else{
      console.log('ERROR')
    }
  }
  delete(){
    this.productService.deleteProduct(this.id).then(
      () => {
        alert("Phone Deleted")
        this.router.navigateByUrl(`/`)
      }
    )
  }
}
