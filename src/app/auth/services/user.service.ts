import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from '../../../environments/environment';
import {Validators} from '@angular/forms';
import {ChangePwDto} from '../model/change-pw-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(this.apiUrl + '/service/users/all');
  }

  getByUsername(username: string) {
    return this.http.get(this.apiUrl + '/service/users/principle/' + username);
  }

  forgotPassword(email: string) {
    return this.http.post(this.apiUrl + '/service/auth/reset_password', email);
  }

  checkTokenExpired(token: string, email: string) {
    return this.http.get(`${this.apiUrl}/service/auth/reset_password/${token}/edit?email=` + email);
  }

  resetPassword(user: User, token: string, email: string) {
    return this.http.put(this.apiUrl + '/service/auth/reset_password/' + token + '?email=' + email, user);
  }

  checkAuthToken(token: string) {
    return this.http.post(this.apiUrl + '/service/users/auth/check_auth_token', token);
  }

  uploadAvatar(avatar: any, username: string) {
    const formData = new FormData();
    formData.append('avatar', avatar);
    return this.http.post(`${this.apiUrl}/service/users/${username}/updateavatar`, formData);
  }

  confirmAccount(token: string, email: string) {
    return this.http.get(this.apiUrl + '/service/auth/' + token + '/confirm?email=' + email);
  }

  changePassword(changePwDto: ChangePwDto) {
    return this.http.post(this.apiUrl + '/service/users/changepw', changePwDto);
  }

}
