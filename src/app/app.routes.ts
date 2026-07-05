import { Routes } from '@angular/router';

import { HomeComponent } from './common/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ConfirmAccountComponent } from './auth/confirm-account/confirm-account.component';
import { UploadComponent } from './common/upload/upload.component';
import { FilelistComponent } from './common/upload/filelist/filelist.component';
import { LayoutComponent } from './admin-template/layout/layout.component';
import { TodoComponent } from './todo-item/todo/todo.component';
import { UserComponent } from './auth/user/user.component';
import { EditUserComponent } from './auth/edit-user/edit-user.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'auth/reset_password/:token/edit', component: ResetPasswordComponent },
  { path: 'auth/:token/confirm', component: ConfirmAccountComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'filelist', component: FilelistComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
      { path: 'dashboard', loadChildren: () => import('./admin-template/layout/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
      { path: 'todos/:id', component: TodoComponent },
      { path: 'users/:username', component: UserComponent },
      { path: 'users/:username/edit', component: EditUserComponent },
      { path: 'users/:username/changepw', component: ChangePasswordComponent },
      { path: 'charts', loadChildren: () => import('./admin-template/layout/charts/charts.routes').then(m => m.CHARTS_ROUTES) },
      { path: 'crypto', loadChildren: () => import('./crypto/crypto.routes').then(m => m.CRYPTO_ROUTES) },
    ]
  }
];
