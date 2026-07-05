import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import {User} from '../../../auth/model/user';
import {Router} from '@angular/router';
import { AlertComponent } from '../components/alert/alert.component';
import { ListTodoComponent } from '../../../todo-item/list-todo/list-todo.component';
import { TimelineComponent } from './components/timeline/timeline.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [AlertComponent, ListTodoComponent, TimelineComponent]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    currentUser: User;

    constructor(
      private router: Router
    ) {
        this.alerts.push(
            {
                id: 1,
                type: 'success',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            },
            {
                id: 2,
                type: 'warning',
                message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptates est animi quibusdam praesentium quam, et perspiciatis,
                consectetur velit culpa molestias dignissimos
                voluptatum veritatis quod aliquam! Rerum placeat necessitatibus, vitae dolorum`
            }
        );
    }

    ngOnInit() {
      this.getCurrentUser();
      if (this.currentUser === null) {
        this.router.navigate(['/home']);
      }
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }

  private getCurrentUser() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
