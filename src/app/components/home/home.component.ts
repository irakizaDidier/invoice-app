import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadInvoices } from '../../store/actions/invoice.actions';
import {
  selectAllInvoices,
  selectInvoiceError,
} from '../../store/selectors/invoice.selectors';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  invoices$: Observable<Invoice[]>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.invoices$ = this.store.select(selectAllInvoices);
    this.error$ = this.store.select(selectInvoiceError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadInvoices());
  }
}
