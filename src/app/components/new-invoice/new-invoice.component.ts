import { Component } from '@angular/core';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css']
})
export class NewInvoiceComponent {
  // Define any necessary properties and methods for handling form data and item list

  constructor() { }

  addItem() {
    // Logic to add a new item to the item list
  }

  saveAsDraft() {
    // Logic to save invoice as draft
  }

  saveAndSend() {
    // Logic to save and send the invoice
  }

  discard() {
    // Logic to discard the form
  }
}
