import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../model/todo';
import {Item} from '../model/item';
import {User} from '../../auth/model/user';
import {environment} from '../../../environments/environment';
import {Description} from '../model/description';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  url: string;
  apiUrl = environment.api_url;
  SERVICE_TODOS = '/service/todos';

  constructor(private http: HttpClient) {
  }

  createTodo(todo: Todo) {
    return this.http.post(`${this.apiUrl}/service/todos/create`, todo);
  }

  getTodos() {
    return this.http.get(`${this.apiUrl}/service/todos/`);
  }

  getTodo(todo_id): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/service/todos/${todo_id}`);
  }

  getTodoItems(todo_id) {
    return this.http.get<Item[]>(`${this.apiUrl}/service/todos/${todo_id}/items`);
  }

  createTodoItem(todo_id, item: Item) {
    return this.http.post(`${this.apiUrl}/service/todos/${todo_id}/items`, item);
  }

  addUserToTodo(todo_id, user_id) {
    return this.http.post(`${this.apiUrl}/service/todos/${todo_id}/add_user`, {userId: user_id});
  }

  getTodoUsers(todo_id) {
    return this.http.get<User[]>(`${this.apiUrl}/service/todos/${todo_id}/users`);
  }

  getTodoItem(todo_id, item_id) {
    return this.http.get<Item>(`${this.apiUrl}/service/todos/${todo_id}/items/${item_id}`);
  }

  updateTodoItem(todo_id, item_id, item: Item) {
    return this.http.put(`${this.apiUrl}/service/todos/${todo_id}/items/${item_id}`, item);
  }

  deleteTodoItem(todo_id, item_id) {
    return this.http.delete(this.apiUrl + '/service/todos/' + todo_id + '/items/' + item_id);
  }

  updateTodo(todo_id, todo: Todo) {
    return this.http.put(this.apiUrl + '/service/todos/' + todo_id, todo);
  }

  deleteTodo(todo_id) {
    return this.http.delete(`${this.apiUrl}/service/todos/${todo_id}`);
  }

  createItemDescription(description: Description, todo_id, item_id, entity) {
    return this.http.post(`${this.apiUrl}/service/todos/${todo_id}/items/${item_id}/descriptions/create/?entity=${entity}`, description);
  }

  getItemDescriptions(todo_id, item_id) {
    return this.http.get<Description[]>(`${this.apiUrl}/service/todos/${todo_id}/items/${item_id}/descriptions`);
  }

  updateItemDescription(todo_id, item_id, description: Description, entity) {
    this.url = `${this.apiUrl}/service/todos/${todo_id}/items/${item_id}/descriptions/${description.id}/update/?entity=${entity}`;
    return this.http.put(this.url, description);
  }

  setItemDueDate(todo_id, item_id, dueDate) {
    return this.http.put(`${this.apiUrl}/service/todos/${todo_id}/items/${item_id}/due_date`, dueDate);
  }

  getItemsByUser(user_id) {
    return this.http.get(`${this.apiUrl}/timeline/${user_id}/items`);
  }

  checkOpenItems(todo_id: number): Observable<boolean> {
    return this.http.get<boolean>(this.apiUrl + this.SERVICE_TODOS + '/check/items/' + todo_id);
  }

}
