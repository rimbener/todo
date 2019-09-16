import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import SearchFilter from '../../../../models/search-filter.model';

@Component({
  selector: 'app-todo-search-form',
  templateUrl: './todo-search-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoSearchFormComponent implements OnInit {
  @Output() search: EventEmitter<SearchFilter> = new EventEmitter();

  public searchForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      id: new FormControl(''),
      title: new FormControl(''),
      resolved: new FormControl(false),
      unresolved: new FormControl(false)
    });
  }

  public onSearch() {
    this.search.emit(this.searchForm.value);
  }
}
