import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TodoService} from '../../todo-item/services/todo.service';
import {UserService} from '../../auth/services/user.service';
import {User} from '../../auth/model/user';
import {AlertService} from '../../admin-template/layout/components/alert/services/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit, OnDestroy {

  loading = false;
  submitted = false;
  addUserForm: FormGroup;
  @Input() user_id: string;
  todo_users: User[];
  users: User[];
  data: any;
  todo: any;
  @Input() todo_id: string;
  selectedUser: User;
  @Input() todo_title: string;
  showAF = false;
  subscription$: Subscription[] = [];

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.getUserForTodo();
    this.getAddUserForm();
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.forEach((s) => {
        s.unsubscribe();
      });
    }
  }

  showAddUserForm() {
    this.showAF = !this.showAF;
    if (this.showAF) {
      this.loadUser();
    } else {
      this.users = [];
    }
  }

  addUserToTodo() {
    this.submitted = true;
    if (this.addUserForm.invalid) {
      return;
    }
    this.loading = true;
    this.user_id = this.addUserForm.value['selectedUser'];
    this.subscription$.push(this.todoService.addUserToTodo(this.todo_id, this.user_id).subscribe(data => {
      this.getUserForTodo();
      this.data = data;
      this.loading = false;
      this.alertService.success('user successfully added');
    }, error => {
      // this.alertService.error(error);
      this.loading = false;
    }));
  }

  get u() {
    return this.addUserForm.controls;
  }

  private getAddUserForm() {
    this.addUserForm = this.formBuilder.group({
      user_id: [],
      selectedUser: this.selectedUser
    });
  }

  private getUsers() {
    this.subscription$.push(this.userService.getAll().subscribe(data => {
      this.users = data;
    }, error => {
    }));
  }

  loadUser() {
    this.getUsers();
  }

  private getUserForTodo() {
    this.subscription$.push(this.todoService.getTodoUsers(this.todo_id).subscribe(data => {
      this.todo_users = data;
    }, error => {
      // this.alertService.error(error);
    }));
  }

}
