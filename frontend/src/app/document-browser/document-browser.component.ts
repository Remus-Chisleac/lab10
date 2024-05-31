import { Component } from '@angular/core';
import { DocumentsService } from '../services/documents.service';
import { CommonModule, NgFor } from '@angular/common';
import { Doc} from '../../../types';
import { Location } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-browser',
  standalone: true,
  imports: [NgFor, CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './document-browser.component.html',
  styleUrl: './document-browser.component.css'
})
export class DocumentBrowserComponent {

  documents: Doc[] = [];

  SelectedDocument: Doc | undefined = undefined;

  selectedFormat:string = '';
  filter:string = ""; 
  Formats = [
    {name: 'All', value: ''},
    {name: 'PDF', value: 'pdf'},
    {name: 'DOC', value: 'doc'},];


  documentForm = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    format: ['', Validators.required],
    pages: [0, Validators.required]
  });

  constructor(private fb: FormBuilder,
    private documentsService: DocumentsService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.documentsService
    .getDocuments('http://localhost:5034/api/get_documents', 'format=')
    .subscribe(data => {
      console.log(data);
      this.documents = data;
    });
  };

  loadDocuments(value: any) {
    this.selectedFormat = value.target.value;
    this.documents= [];
    this.documentsService
    .getDocuments('http://localhost:5034/api/get_documents', 'format='+ value.target.value)
    .subscribe(data => {
      console.log(data);
      this.documents = data;
    });
  }

  loadDocuments_preFilter() {
    setTimeout(() => {
    this.documents= [];
    this.SelectedDocument = undefined;
    this.documentsService
    .getDocuments('http://localhost:5034/api/get_documents', 'format='+ this.selectedFormat)
    .subscribe(data => {
      console.log(data);
      this.documents = data;
    });
    }, 200);
  }

  showDocument(docId: number) {
    this.SelectedDocument = this.documents.find(doc => doc.id === docId);
    if(this.SelectedDocument){
      this.documentForm.setValue({title: this.SelectedDocument.title,
      author: this.SelectedDocument.author, 
      format: this.SelectedDocument.format,
      pages: this.SelectedDocument.pages})
    }
  }

  updateFilter(){
    this.documentsService
    .getDocuments('http://localhost:5034/api/get_documents', 'format=' + this.filter)
    .subscribe(data => {
      console.log(data);
      this.documents = data;
    });
  }

  updateDocument(){
    if (this.documentForm.valid) {
      console.log(this.documentForm.value);
      let params :string = 'id=' + this.SelectedDocument?.id + 
      '&title=' + this.documentForm.value.title + 
      '&author=' + this.documentForm.value.author + 
      '&format=' + this.documentForm.value.format + 
      '&pages=' + this.documentForm.value.pages;
      this.documentsService.updateDocument('http://localhost:5034/api/update_document', params)
      .subscribe((data) => {
        
      });
      this.loadDocuments_preFilter();
    }
  }

  deleteDocument(){
    let docId:number|undefined = this.SelectedDocument?.id;
    console.log(docId);
    if(docId)
    this.documentsService
    .deleteDocument('http://localhost:5034/api/remove_document', 'id=' + docId)
    .subscribe(data => {
      console.log(data);
    });
    this.loadDocuments_preFilter();
  }

  back(){
    this.router.navigate(['home']);
  }
}
