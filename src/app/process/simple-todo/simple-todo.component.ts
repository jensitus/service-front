import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TodoService} from '../../todo-item/services/todo.service';
import {AlertService} from '../../admin-template/layout/components/alert/services/alert.service';
import {CommonService} from '../../common/services/common.service';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-simple-todo',
  templateUrl: './simple-todo.component.html',
  styleUrls: ['./simple-todo.component.css']
})
export class SimpleTodoComponent implements OnInit, OnDestroy {

  @Input() item: any;
  @Input() todo_id: string;
  loading: boolean;
  data: any;
  faTrash = faTrash;
  subscription$: Subscription[] = [];

  constructor(
    private todoService: TodoService,
    private alertService: AlertService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.forEach((s) => {
        s.unsubscribe();
      });
    }
  }

  deleteItem(item_id) {
    this.loading = true;
    this.subscription$.push(this.todoService.deleteTodoItem(this.todo_id, item_id).subscribe(data => {
      this.data = data;
      this.alertService.success(this.data.text, true);
      this.commonService.setItemSubject(true);
      this.loading = false;
    }, error => {
      this.loading = false;
    }));
  }

  updateTodoItem(item_id) {
    this.loading = true;
    this.item = {
      id: item_id
    };
    this.subscription$.push(this.todoService.updateTodoItem(this.todo_id, item_id, this.item).subscribe(data => {
      this.item = data;
      if (this.item.done === true) {
        this.alertService.success('item successfully done', false);
      } else if (this.item.done === false) {
        this.alertService.success('item is still open', false);
      }
      this.loading = false;
    }));
  }

}
