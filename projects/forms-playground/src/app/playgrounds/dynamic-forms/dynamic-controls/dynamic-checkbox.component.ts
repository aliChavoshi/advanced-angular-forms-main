import { Component } from '@angular/core';
import { ValidatorMessageContainer } from '../../../core/input-error/validator-message-container.directive';
import { BaseDynamicControl, dynamicControlProvider, sharedDynamicControlDeps } from './base-dynamic-control';

@Component({
  selector: 'app-dynamic-checkbox',
  standalone: true,
  imports: [...sharedDynamicControlDeps, ValidatorMessageContainer],
  viewProviders: [dynamicControlProvider],
  template: `
    <div>
      <input type="checkbox" [container]="containerDir.container" [formControlName]="control.controlKey" [checked]="control.config.value" [id]="control.controlKey">
      <label [for]="control.controlKey">{{control.config.label}}</label>
    </div>
    <ng-container validatorMessageContainer #containerDir="validatorMessageContainer"></ng-container>
  `,
  styles: [`
    :host > div {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
  `]
})
export class DynamicCheckboxComponent extends BaseDynamicControl {
}
