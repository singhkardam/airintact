import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';

import { LoginComponent } from './components/user/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { SignUpComponent } from './components/user/sign-up/sign-up.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AuthGuardGuard } from './auth/auth-guard.guard';
import { TAndCComponent } from './components/common/t-and-c/t-and-c.component';

const routes: Routes = [
  {  path:'', component: LoginComponent },
  {  path:'sign-up', component: SignUpComponent },
  {  path:'t-and-c', component: TAndCComponent },
  {  path:'products', component: ProductsComponent, canActivate:[AuthGuardGuard] },
  {  path:'user/dashboard', component: UserDashboardComponent, canActivate:[AuthGuardGuard] },
  {  path:'admin/dashboard', component: AdminDashboardComponent, canActivate:[AuthGuardGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
