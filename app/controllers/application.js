// import Controller from '@ember/controller';
import Ember from 'ember';
export default Ember.Controller.extend({
    invoices: [
        {number: '1', price: '1500'}, 
        {number: '2', price: '200'}, 
        {number: '3', price: '3000'}
    ],
    actions: {
        addInvoice: function(){
            let invoiceNumber = this.get('invoiceNumber');
            let invoicePrice = this.get('invoicePrice');
            this.get('invoices').pushObject({number: invoiceNumber, price: invoicePrice})
        }
    }
});
