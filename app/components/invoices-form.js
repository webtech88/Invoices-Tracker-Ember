import Component from '@ember/component';

export default Component.extend({
    tagName:'',
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
        }
    }
});