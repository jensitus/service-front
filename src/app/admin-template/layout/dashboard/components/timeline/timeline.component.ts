import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TodoService} from '../../../../../todo-item/services/todo.service';
import {faBomb, faGraduationCap, faClock, faCheck, faCreditCard} from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [FaIconComponent, RouterLink, DatePipe]
})
export class TimelineComponent implements OnInit {

  @Input() user_id: number;
  items: any;
  faBomb = faBomb;
  faGraduationCap = faGraduationCap;
  faClock = faClock;
  faCheck = faCheck;
  faCreditCard = faCreditCard;

  constructor(
    private todoService: TodoService
  ) { }

  ngOnInit() {
    this.todoService.getItemsByUser(this.user_id).subscribe(response => {
      this.items = response;
      console.log(this.items);
    }, error => {
      console.log(error);
    });
  }

}
