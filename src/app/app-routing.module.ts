import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
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
  { path: "", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
