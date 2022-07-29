import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { AwesomeIconModule } from '../awesome-icon/awesome-icon.module';



@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    AwesomeIconModule
  ],
  exports: [LoadingSpinnerComponent]
})
export class LoadingSpinnerModule { }
