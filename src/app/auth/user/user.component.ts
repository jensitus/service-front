import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {UserService} from '../services/user.service';
import {AlertService} from '../../admin-template/layout/components/alert/services/alert.service';
import {User} from '../model/user';
import { PageHeaderComponent } from '../../admin-template/shared/modules/page-header/page-header.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PageHeaderComponent, RouterLink]
})
export class UserComponent implements OnInit {

  currentUser: User;
  username: string;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.getCurrentUser();
    this.activatedRoute.params.subscribe(params => {
      this.username = params['username'];
    });
    this.userService.getByUsername(this.username).subscribe(data => {
      this.user = data;
      console.log(this.user);
      this.alertService.success('hi');
    }, error => {
      this.alertService.error(error);
    });
  }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
