import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
import SearchFilter from '../../../models/search-filter.model';

@Component({
  selector: 'app-todo-search-filter',
  templateUrl: './todo-search-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoSearchFilterComponent implements OnInit {
  @Output() search: EventEmitter<SearchFilter> = new EventEmitter();
  public hidden: boolean;

  public isMobile: boolean;

  constructor(private platform: Platform) { }

  ngOnInit() {
    this.isMobile = this.platform.is('mobile');
  }

  public onToggleVisibility(ev: boolean) {
    this.hidden = ev;
  }

  public onSearch(ev: SearchFilter) {
    this.hidden = true;
    this.search.emit(ev);
  }
}
