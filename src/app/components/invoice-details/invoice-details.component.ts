import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectInvoiceById } from '../../store/selectors/invoice.selectors';
import { Invoice } from '../../models/invoice.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css'],
})
export class InvoiceDetailsComponent implements OnInit {
  invoice$: Observable<Invoice | undefined>;

  constructor(private route: ActivatedRoute, private store: Store) {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.invoice$ = this.store.select(selectInvoiceById(id));
  }

  ngOnInit(): void {}
}
