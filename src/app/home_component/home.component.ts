import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {DataService} from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: Array<User> = [];

  constructor(private http: HttpClient, private router: Router, private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getUsers().subscribe((data: Array<User>) => this.users = data,
      error => {
        console.log(error);
      });
  }

  deleteUser(id: number, i: number) {
    this.dataService.deleteUser(id).subscribe((data: string) => {
        this.users.splice(i, 1);
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  editUser(user: User) {
    this.router.navigate(['/edit', user.id]);
  }
}

export class User {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  id: number;

  constructor(firstName: string,
              lastName: string,
              email: string,
              age: number,
              id: number) {
    this.age = age;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.id = id;
  }
}
