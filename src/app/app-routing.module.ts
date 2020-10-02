import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeInNewCasesComponent } from '@modules/charts/de-in-new-cases/de-in-new-cases.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/charts',
    pathMatch: 'full'
  },
  {
    path: 'charts',
    component: DeInNewCasesComponent
    // children: [
    //   {
    //     path: 'newcases',
    //     loadChildren: () =>
    //       import('@modules/charts/charts.module').then(m => m.ChartsModule)
    //   }
    // ]
  },
   // Fallback when no prior routes is matched
  {
    path: '**',
    redirectTo: '/charts',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
