import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocumentBrowserComponent } from './document-browser/document-browser.component';
import { AddDocumentComponent } from './add-document/add-document.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'documentBrowser', component: DocumentBrowserComponent},
    {path: 'documentAdder', component: AddDocumentComponent}
];
