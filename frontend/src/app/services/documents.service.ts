import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http'; // Import HttpParams
import { Doc } from '../../../types';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  constructor(private apiService: ApiService) { }

  getDocuments(url: string, params: string): Observable<Doc[]> {
    const httpParams = new HttpParams({ fromString: params });
    return this.apiService.get(url, { params: httpParams });
  }

  addDocument(url: string, params: string): Observable<any> {
    const httpParams = new HttpParams({ fromString: params });
    console.log(httpParams);
    return this.apiService.post(url, { params: httpParams });
  }

  deleteDocument(url: string, params: string): Observable<any> {
    const httpParams = new HttpParams({ fromString: params });
    return this.apiService.delete(url, { params: httpParams });
  }

  updateDocument(url: string, params: string): Observable<any> {
    const httpParams = new HttpParams({ fromString: params });
    return this.apiService.put(url, { params: httpParams });
  }
}
