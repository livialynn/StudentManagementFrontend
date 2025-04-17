import {Component, OnInit} from '@angular/core';
import {StudentService} from './student.service';

@Component({
  selector: 'app-student',
  standalone: false,
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit{
  students:Student[] = [];
  isEditing = false;
  showForm = false;
  selectedId: number | null = null;
  newStudent: Student = { id: 0, name: '', email: '', age: 0 };


  constructor(private studentService: StudentService) {}
  //dependency injection in typescript: StudentService is created by angular

  ngOnInit(): void { //angular
    this.loadStudents();
  }
  loadStudents():void {
    this.studentService.getStudents().subscribe(data=>(this.students = data));
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id).subscribe(()=>this.loadStudents());
  }

  editStudent(student: Student):void{
    this.isEditing = true;
    this.showForm = true;
    this.selectedId = student.id;
    this.newStudent = { ...student };
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm(): void {
    this.newStudent = { id: 0, name: '', email:'', age: 0 };
    this.isEditing = false;
    this.showForm = false;
    this.selectedId = null;
  }

  submitStudent():void{
    if(this.isEditing && this.selectedId != null){//edit
      this.studentService.updateStudent(this.selectedId, this.newStudent).subscribe(()=>{
        this.loadStudents();
        this.resetForm();
      });
    }else{//create
      this.studentService.createStudent(this.newStudent).subscribe(()=>{
        this.loadStudents();
        this.resetForm();
      });
    }
  }
}


export interface Student{
  id: number;
  name: string;
  email: string;
  age: number;
}
