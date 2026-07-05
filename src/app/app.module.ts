import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HomeComponent} from './common/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {UserService} from './auth/services/user.service';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withXhr } from '@angular/common/http';
import {AuthenticationService} from './auth/services/authentication.service';
import {JwtInterceptor} from './auth/helpers/jwt.interceptor';
import {ErrorInterceptor} from './common/helper/error.interceptor';
import {AuthGuard} from './auth/guards/auth.guard';
import {NavbarComponent} from './common/navbar/navbar.component';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {ForgotPasswordComponent} from './auth/forgot-password/forgot-password.component';
import {ShowTodoComponent} from './todo-item/show-todo/show-todo.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {UserComponent} from './auth/user/user.component';
import {EditUserComponent} from './auth/edit-user/edit-user.component';

import {TodoComponent} from './todo-item/todo/todo.component';
import {ProcessMigrationComponent} from './common/process-migration/process-migration.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from './admin-template/layout/layout.module';
import {ConfirmAccountComponent} from './auth/confirm-account/confirm-account.component';
import {AlertModule} from './admin-template/layout/components/alert/alert.module';
import {ChangePasswordComponent} from './auth/change-password/change-password.component';
import {PageHeaderModule} from './admin-template/shared/modules';
import {UploadComponent} from './common/upload/upload.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FilelistComponent} from './common/upload/filelist/filelist.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DashboardModule} from './admin-template/layout/dashboard/dashboard.module';
import {SimpleTodoComponent} from './process/simple-todo/simple-todo.component';
import {ComplexTodoComponent} from './process/complex-todo/complex-todo.component';
import {DescriptionComponent} from './todo-item/description/add/description.component';
import {AddItemDueDateComponent} from './todo-item/add-item-due-date/add-item-due-date.component';
import {EditDescriptionComponent} from './todo-item/description/edit/edit-description.component';
import { LinkifyPipe } from './common/pipe/linkify.pipe';

const app_routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  // { path: '', loadChildren: () => import('./admin-template/layout/layout.module').then(m => m.LayoutModule), canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot', component: ForgotPasswordComponent},
  {path: 'auth/reset_password/:token/edit', component: ResetPasswordComponent},
  {path: 'auth/:token/confirm', component: ConfirmAccountComponent},
  {path: 'upload', component: UploadComponent},
  {path: 'filelist', component: FilelistComponent},
/*
  {path: 'todos', component: TodoComponent},
  {path: 'todos/:id', component: ShowTodoComponent},
  {path: 'diaries', component: DiaryListComponent},
  {path: 'diaries/:id', component: DiaryComponent},
  {path: 'diaries/:id/edit', component: EditDiaryComponent},
  {path: 'tasks/:formKey/:taskId', component: TaskComponent},
  {path: 'tasks/list', component: TaskListComponent},
  {path: 'migrate/process', component: ProcessMigrationComponent}*/
];

@NgModule({ declarations: [AppComponent], exports: [],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(app_routes, { enableTracing: true }),
        ReactiveFormsModule,
        NgbModule,
        LayoutModule,
        AlertModule,
        PageHeaderModule,
        FileUploadModule,
        FontAwesomeModule,
        DashboardModule, HomeComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
        // ItemsComponent,
        ShowTodoComponent,
        UserComponent,
        EditUserComponent,
        TodoComponent,
        ProcessMigrationComponent,
        ConfirmAccountComponent,
        ChangePasswordComponent,
        UploadComponent,
        FilelistComponent,
        SimpleTodoComponent,
        ComplexTodoComponent,
        DescriptionComponent,
        AddItemDueDateComponent,
        EditDescriptionComponent,
        LinkifyPipe], providers: [
        AuthGuard,
        UserService,
        AuthenticationService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        provideHttpClient(withXhr(), withInterceptorsFromDi())
    ] })
export class AppModule {
}
