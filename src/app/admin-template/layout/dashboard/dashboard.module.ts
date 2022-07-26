import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {
    TimelineComponent,
    NotificationComponent,
    ChatComponent
} from './components';
import { StatModule } from '../../shared';
import {AddTodoComponent} from '../../../todo-item/add-todo/add-todo.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ListTodoComponent} from '../../../todo-item/list-todo/list-todo.component';
import {AlertModule} from '../components/alert/alert.module';

@NgModule({
    imports: [
        CommonModule,
        NgbCarouselModule,
        NgbAlertModule,
        DashboardRoutingModule,
        StatModule,
        ReactiveFormsModule,
        FontAwesomeModule,
        FormsModule,
        AlertModule
    ],
    exports: [
        AddTodoComponent
    ],
    declarations: [
        DashboardComponent,
        TimelineComponent,
        NotificationComponent,
        ChatComponent,
        ListTodoComponent,
        AddTodoComponent
    ]
})
export class DashboardModule {}
