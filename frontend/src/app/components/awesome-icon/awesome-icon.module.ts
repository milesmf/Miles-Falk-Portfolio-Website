import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AwesomeIconComponent } from './awesome-icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AwesomeIconComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [AwesomeIconComponent]
})
export class AwesomeIconModule { }
