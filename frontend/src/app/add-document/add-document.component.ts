import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { DocumentsService } from '../services/documents.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-document',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-document.component.html',
  styleUrl: './add-document.component.css'
})
export class AddDocumentComponent {

  documentForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    format: ['', Validators.required],
    pages: [0, Validators.required]
  });

  constructor(private fb: FormBuilder,
    private documentsService: DocumentsService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
  }

  
  // addDocument(){
  //   this.documentsService
  //   .addDocument('http://localhost/api/add_document.php', 'title=' + this.title + '&author=' + this.author + '&format=' + this.format + '&pages=' + this.pages)
  //   .subscribe(data => {
  //     console.log(data);
  //     this.updateFilter();
  //   });
  // }


  addDocument() {
    if (this.documentForm.valid) {
      console.log(this.documentForm.value);
      let params :string = 'title=' + this.documentForm.value.title + 
      '&author=' + this.documentForm.value.author + 
      '&format=' + this.documentForm.value.format + 
      '&pages=' + this.documentForm.value.pages;
      this.documentsService.addDocument('http://localhost:5034/api/add_document', params)
      .subscribe(()=> {
        this.router.navigate(['documentBrowser']);
      });
    }
  }

  back(){
    this.router.navigate(['documentBrowser']);
  }
}
