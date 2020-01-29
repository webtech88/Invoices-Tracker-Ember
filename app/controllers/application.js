// import Controller from '@ember/controller';
import Ember from 'ember';
export default Ember.Controller.extend({
    invoices: [
        {num: '1', price: '1500'}, 
        {num: '2', price: '2000'}, 
        {num: '3', price: '3000'}
    ],
    actions: {
        addInvoice: function(){
            let invoiceNumber = this.get('invoiceNumber');
            let invoicePrice = this.get('invoicePrice');
            this.get('invoices').pushObject({num: invoiceNumber, price: invoicePrice})
        },
        deleteInvoice: function(index){
            this.get('invoices').splice(index, 1)
        }
    }
});
