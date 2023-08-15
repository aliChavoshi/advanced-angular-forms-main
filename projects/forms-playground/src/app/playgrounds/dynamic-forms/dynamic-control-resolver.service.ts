import { Injectable, Type } from '@angular/core';
import { from, of, tap } from 'rxjs';
import { DynamicCheckboxComponent } from './dynamic-controls/dynamic-checkbox.component';
import { DynamicGroupComponent } from './dynamic-controls/dynamic-group.component';
import { DynamicInputComponent } from './dynamic-controls/dynamic-input.component';
import { DynamicSelectComponent } from './dynamic-controls/dynamic-select.component';
import { DynamicControl } from './dynamic-forms.model';

type DynamicControlsMap = {
  [T in DynamicControl['controlType']]: () => Promise<Type<any>>;
};

@Injectable({
  providedIn: 'root'
})
export class DynamicControlResolver {
  private lazyControlComponents: DynamicControlsMap = {
    input: () => import('./dynamic-controls/dynamic-input.component').then(c => c.DynamicInputComponent),
    select: () => import('./dynamic-controls/dynamic-select.component').then(c => c.DynamicSelectComponent),
    checkbox: () => import('./dynamic-controls/dynamic-checkbox.component').then(c => c.DynamicCheckboxComponent),
    group: () => import('./dynamic-controls/dynamic-group.component').then(c => c.DynamicGroupComponent)
  }
  private loadedControlComponents = new Map<string, Type<any>>();

  resolve(controlType: keyof DynamicControlsMap) {
    const loadedComponent = this.loadedControlComponents.get(controlType);
    if (loadedComponent) {
      return of(loadedComponent);
    }
    return from(this.lazyControlComponents[controlType]()).pipe(
      tap(comp => this.loadedControlComponents.set(controlType, comp))
    );
  }
}
