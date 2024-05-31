import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DocumentBrowserComponent } from './document-browser/document-browser.component';
import { AddDocumentComponent } from './add-document/add-document.component';
import { LoginComponent } from './login/login.component';
import { authGuardGuard } from './services/auth-guard.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [authGuardGuard]},
    {path: 'documentBrowser', component: DocumentBrowserComponent, canActivate: [authGuardGuard]},
    {path: 'documentAdder', component: AddDocumentComponent, canActivate: [authGuardGuard]}
];
