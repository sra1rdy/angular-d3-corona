import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeInNewCasesComponent } from './de-in-new-cases/de-in-new-cases.component';



@NgModule({
  declarations: [DeInNewCasesComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DeInNewCasesComponent
  ]
})
export class ChartsModule { }
