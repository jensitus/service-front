import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Todo} from '../model/todo';
import {ActivatedRoute} from '@angular/router';
import {TodoService} from '../services/todo.service';
import {AlertService} from '../../admin-template/layout/components/alert/services/alert.service';
import {CommonService} from '../../common/services/common.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit, OnDestroy {

  todoName: string;
  todo: Todo;
  loading = false;
  submitted = false;
  simple: boolean;
  titleError = false;
  placeholder = 'Todo Title';
  simpleLabel = 'simple';
  subscription$: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private alertService: AlertService,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.simple = true;
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.forEach((s) => {
        s.unsubscribe();
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.todoName === null || this.todoName === undefined || this.todoName === '') {
      this.titleError = true;
      this.placeholder = 'Required';
      return;
    }
    this.todo = {
      simple: this.simple,
      title: this.todoName
    };
    this.subscription$.push(this.todoService.createTodo(this.todo).subscribe(data => {
      console.log('the new todo', data);
      this.commonService.setNewTodoSubject(true);
      this.loading = false;
    }, error => {
      // this.alertService.error(error);
    }));
  }

  simpleOrNot(event) {
    if (event.target.checked === true) {
      this.simple = true;
      this.simpleLabel = 'simple';
    } else if (event.target.checked === false) {
      this.simple = false;
      this.simpleLabel = 'complex';
    }
  }
}
