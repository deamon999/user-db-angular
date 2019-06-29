import {Component, OnInit} from '@angular/core';
import {User} from '../home_component/home.component';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DataService} from '../data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  private user: User = new User('', '', '', null, null);
  private subscription: Subscription;
  private id: string = null;
  private buttonText = 'Add';

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, private router: Router, private dataService: DataService) {
    this.subscription = activateRoute.params.subscribe(params => {
      if (params.id) {
        this.getUser(params.id);
        this.buttonText = 'Edit';
      }
    });
  }

  ngOnInit() {
  }

  clearData() {
    this.user.id = null;
    this.user.lastName = '';
    this.user.firstName = '';
    this.user.email = '';
    this.user.age = null;
  }

  addUser() {
    if (this.user.id) {
      this.dataService.updateUser(this.user).subscribe((data) => {
        console.log(data);
        this.clearData();
        this.router.navigate(['/']);
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.dataService.createUser(this.user).subscribe((data) => {
        console.log(data);
        this.clearData();
        this.router.navigate(['/']);
      }, error1 => {
        console.log(error1);
      });
    }
  }

  getUser(id: string) {
    this.dataService.getUser(id).subscribe((data: User) => {
      this.user = data;
    });
  }
}
