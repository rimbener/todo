import { Component, Output, EventEmitter, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterButtonComponent {
  @Input() hidden: boolean;
  @Output() toggleVisibility: EventEmitter<boolean> = new EventEmitter(false);

  constructor() { }

  public toggleFilter() {
    this.hidden = !this.hidden;
    this.toggleVisibility.emit(this.hidden);
  }
}
