import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <span>
      <span class="icon fa-spin has-text-primary">
          <app-awesome-icon size="1x" [icon]="['fas', 'circle-notch']"></app-awesome-icon>
      </span>
      <span *ngIf="!textOnly" class="ml-2">Loading...</span>
    </span>
  `,
  styles: [
  ]
})
export class LoadingSpinnerComponent implements OnInit {

  @Input('textOnly') public textOnly: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
