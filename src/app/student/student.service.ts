import { Injectable } from '@angular/core';
import {Student} from './student.component';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = "http://localhost:8080/students";
  getStudents():Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.apiUrl);
  }

  updateStudent(id: number, student: Student):Observable<Student[]>{
    return this.httpClient.put<Student[]>(`${this.apiUrl}/${id}`, student);
  }

  createStudent(student: Student):Observable<Student[]>{
    return this.httpClient.post<Student[]>(this.apiUrl,student);
  }

  deleteStudent(id:number):Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }

}
