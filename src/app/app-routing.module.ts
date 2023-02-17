import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { AuthGuard } from './auth/auth.guard'

const routes: Routes = [
  { path: '', 
    redirectTo: "home", 
    pathMatch: "full",
  },
  { path: "home", 
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'leitos-center',
        loadChildren: () => import('./leitos-center/leitos-center.module').then(m => m.LeitosCenterModule),
        data: { title: 'Áreas', preload: true}
      },
      {
        path: 'adm-center',
        loadChildren: () => import('./adm-center/adm-center.module').then(m => m.AdmCenterModule),
        data: { title: 'Administração', preload: true}
      },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    ]
   },
   {
    path: "auth", 
    component: AuthComponent,
    children:[
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent },
      { path: 'register-user', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-email-address', component: VerifyEmailComponent },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
