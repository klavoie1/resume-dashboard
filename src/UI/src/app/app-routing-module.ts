import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { AddApplication } from './features/add-application/add-application';
import { EditApplication } from './features/edit-application/edit-application';

const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'add-application', component: AddApplication },
  { path: 'edit-application', component: EditApplication },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
