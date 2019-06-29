import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from './home_component/home.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'http://localhost:51583/api/users/';

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get(this.url + 'getall');
  }

  getUser(id: string) {
    const params: HttpParams = new HttpParams().set('id', id);
    return this.http.get(this.url + 'getuser', {params});
  }

  createUser(user: User) {
    return this.http.put(this.url + 'adduser', {
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
      email: user.email
    });
  }

  updateUser(user: User) {
    return this.http.post(this.url + 'edituser', user);
  }

  deleteUser(id: number) {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(this.url + 'deleteuser', {params});
  }
}
