import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.const';
import { Note, NoteDto, NoteGetterDto } from '@core/interfaces/notes.interface';
import { environment } from '@env/environment';
import { uniqBy } from 'lodash';
import { Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private http: HttpClient,
  ) { }

  getCombinedNotes(): Observable<Note[]> {
    return combineLatest([this.getPublicNotes(), this.getAllowedNotes()]).pipe(
      map(([publicNotes, allowedNotes]) => uniqBy([...(publicNotes || []), ...(allowedNotes || [])], (note) => note?.id))
    );
  }

  getPublicNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.httpBackend}${API.PUBLIC_NOTES}`);
  }

  getAllowedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.httpBackend}${API.ALLOWED_NOTES}`);
  }

  getOwnedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.httpBackend}${API.OWNED_NOTES}`);
  }

  getDetailedNote(data: NoteGetterDto): Observable<Note> {
    return this.http.post<Note>(`${environment.httpBackend}${API.DETAILS_NOTE}`, data);
  }

  saveNote(data: NoteDto): Observable<Note> {
    return this.http.post<Note>(`${environment.httpBackend}${API.ADD_NOTE}`, data);
  }
}
