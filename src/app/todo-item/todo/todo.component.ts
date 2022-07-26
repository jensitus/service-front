import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../services/todo.service';
import {AlertService} from '../../admin-template/layout/components/alert/services/alert.service';
import {CommonService} from '../../common/services/common.service';
import {Item} from '../model/item';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../auth/model/user';
import {Todo} from '../model/todo';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {

  itemForm: FormGroup;
  todos: any;
  error: any;
  reload = false;
  loading = false;
  todo: Todo;
  data: any;
  todo_id: any;
  item: any;
  items: Item[];
  itemName: string;
  itemDone = false;
  submitted = false;
  simple = true;
  currentUser: User;
  user_id: string;
  todo_title: string;
  subscription$: Subscription[] = [];
  openItems = true;

  constructor(
    private router: Router,
    private todoService: TodoService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  get f() {
    return this.itemForm.controls;
  }

  // updateTodo(todo_id) {
  //   this.loading = true;
  //   this.todo = {
  //     id: todo_id
  //   };
  //   this.todoService.updateTodo(todo_id, this.todo).subscribe(data => {
  //     this.todo = data;
  //     if (this.todo.done === true) {
  //       this.alertService.success('Todo is really done');
  //     } else if (this.todo.done === false) {
  //       this.alertService.success('this todo is not done yet');
  //     }
  //     this.loading = false;
  //     this.getTodos();
  //   }, error => {
  //     console.log('update todo', error);
  //   });
  // }

  // deleteTodo(todo_id) {
  //   this.loading = true;
  //   this.todoService.deleteTodo(todo_id).subscribe(data => {
  //     this.data = data;
  //     console.log('delete todo success', this.data, data);
  //     this.alertService.success(this.data.text, true);
  //     this.getTodos();
  //     this.loading = false;
  //   }, error => {
  //     this.error = error;
  //     // this.alertService.error(error);
  //   });
  //
  // }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.commonService.checkAuthToken();
    this.activatedRoute.params.subscribe(params => {
      this.todo_id = params['id'];
      this.getTodo(this.todo_id);
      this.getTodoItems();
      this.getItemForm();
    });
    this.reloadIfItemIsDeleted();
    // this.getReloadFromCommonService();
    this.getAlertMessage();
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.forEach((s) => {
        s.unsubscribe();
      });
    }
  }

  private getTodos() {
    this.subscription$.push(this.todoService.getTodos().subscribe((data) => {
        this.todos = data;
      }, (error) => {
        this.error = error;
        if (this.error === 'Missing token' || 'Signature has expired') {
          this.alertService.error('you need to login', true);
          // this.router.navigate(['/login']);
        } else {
          this.alertService.error(error);
        }
      }
    ));
  }

  getTodo(id: number): any {
    this.subscription$.push(this.todoService.getTodo(id).subscribe(result => {
      this.todo = result;
      this.simple = this.todo.simple;
      console.log(this.todo);
    }));
  }

  createItem(type) {
    if (type === 'item') {
      this.submitted = true;
      if (this.itemForm.invalid) {
        return;
      }
      this.loading = true;
      this.item = {
        name: this.itemForm.value.name,
        done: false
      };
      this.subscription$.push(this.todoService.createTodoItem(this.todo_id, this.item).subscribe(data => {
        this.data = JSON.stringify({data});
        this.alertService.success('yes, you did it', false);
        this.getTodoItems();
        this.itemForm.reset();
        this.loading = false;
        this.data = data;
      }, error => {
        // this.alertService.error(error, true);
      }));
    } else if (type === 'descriptio') {

    }
  }

  private getItemForm() {
    this.itemForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  getTodoItems() {
    this.subscription$.push(this.todoService.getTodoItems(this.todo_id).subscribe(data => {
      this.items = data;

    }, error => {
      // this.alertService.error(error);
    }));
  }

  private getReloadFromCommonService() {
    this.subscription$.push(this.commonService.todoSubject.subscribe(res => {
      this.reload = res;
      if (this.reload) {
        this.getTodos();
      }
    }));
  }

  private getAlertMessage() {
    this.alertService.success('your Todo List', true);
  }

  private reloadIfItemIsDeleted() {
    this.subscription$.push(this.commonService.itemSubject.subscribe(res => {
      this.reload = res;
      if (this.reload) {
        this.getTodoItems();
      }
    }));
  }

  setTodoDone() {
    this.subscription$.push(this.todoService.checkOpenItems(this.todo_id).subscribe(result => {
      this.openItems = result;
      if (this.openItems === true) {
        this.alertService.error('there are still things to do', true);
      } else {
        this.subscription$.push(this.todoService.updateTodo(this.todo_id, this.todo).subscribe(res => {
          this.alertService.success('yepp', true);
          this.router.navigate(['/dashboard']);
        }));
      }
    }));
  }

}
