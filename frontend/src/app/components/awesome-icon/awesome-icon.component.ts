import { Component, Input, OnInit } from '@angular/core';
import { SizeProp, IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-awesome-icon',
  template: `
    <span class="icon">
      <!--EXISTING SIZE-->
      <ng-container *ngIf="size !== 'xxs' && size !== 'xxxs' && size !== 'md'; else showCustomSize">
        <fa-icon [size]="size" [icon]="icon"></fa-icon>
      </ng-container>
      <!--CUSTOM SIZE-->
      <ng-template #showCustomSize>
        <fa-icon [ngClass]="{'xxs': size === 'xxs', 'xxxs': size === 'xxxs', 'md': size === 'md'}" [icon]="icon"></fa-icon>
      </ng-template>
    </span>
  `,
  styles: [`

    .xxs,
    .xxxs,
    .md {
      line-height: 0.0833333337em;
    }

    .xxs {
      font-size: 0.45em;
    }

    .xxxs {
      font-size: 0.35em;
    }

    .md {
      font-size: 1.5em;
    }
  `]
})
export class AwesomeIconComponent {

  @Input('size') public size!: SizeProp | 'xxs' | 'xxxs' | 'md';
  @Input('icon') public icon!: IconProp;

  constructor() { }

}