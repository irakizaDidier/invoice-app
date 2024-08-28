import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkMode } from '../../store/selectors/theme.selectors';
import * as ThemeActions from '../../store/actions/theme.actions';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  darkMode$: Observable<boolean>;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.darkMode$ = this.store.select(selectDarkMode);
    this.darkMode$.subscribe(() => this.cdr.markForCheck());
  }

  toggleTheme() {
    this.store.dispatch(ThemeActions.toggleTheme());
  }
}
