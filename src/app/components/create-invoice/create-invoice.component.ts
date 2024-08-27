import { Component } from '@angular/core';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent {
  dropdownOpen = false;
  filters = {
    paid: false,
    pending: false,
    draft: false,
  };

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterInvoices() {
    console.log('Filters applied:', this.filters);
  }
}
