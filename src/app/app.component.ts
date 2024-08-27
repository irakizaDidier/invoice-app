import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectDarkMode } from './store/selectors/theme.selectors';
import * as ThemeActions from './store/actions/theme.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'InvoiceApp';
  darkMode$: Observable<boolean>;

  constructor(private store: Store) {
    this.darkMode$ = this.store.select(selectDarkMode);
  }

  ngOnInit() {
    const darkMode = localStorage.getItem('darkMode') === 'true';

    if (darkMode) {
      this.store.dispatch(ThemeActions.setDarkMode());
    } else {
      this.store.dispatch(ThemeActions.setLightMode());
    }
    this.darkMode$.subscribe((isDarkMode) => {
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    });
  }
}
