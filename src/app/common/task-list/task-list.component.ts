import {Component, OnInit} from '@angular/core';
import {TaskService} from '../services/task.service';
import {User} from '../../auth/model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  currentUser: User;
  taskList: any;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.taskService.getTaskList(this.currentUser.id.toString()).subscribe(data => {
      this.taskList = data;
    });
  }

  passTheTask(t) {
    this.router.navigate(['tasks/', t.formKey, t.id]);
  }

}