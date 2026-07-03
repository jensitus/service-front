import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {Diary} from '../model/diary';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  createDiary(diary: Diary) {
    return this.http.post(`${this.apiUrl}/service/diaries`, diary);
  }

  getDiaries() {
    return this.http.get<Diary[]>(`${this.apiUrl}/service/diaries`);
  }

  getDiary() {
    return this.http.get<Diary>(`${this.apiUrl}/diary`);
  }

  updateDiary(diary: Diary) {
    return this.http.put(`${this.apiUrl}/service/diaries/`, diary);
  }

}
