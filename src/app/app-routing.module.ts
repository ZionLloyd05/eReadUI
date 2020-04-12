import { AuthComponent } from './auths/containers/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module')
      .then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
