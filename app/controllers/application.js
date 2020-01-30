import Controller from '@ember/controller';
export default Controller.extend({
    invoices: [
        {num: '1', amount: '1500'}, 
        {num: '2', amount: '2000'}, 
        {num: '3', amount: '3000'}
    ],
    actions: {
        addInvoice: function(){
            let invoiceNumber = this.get('invoiceNumber');
            let invoiceAmount = this.get('invoiceAmount');
            this.get('invoices').pushObject({num: invoiceNumber, amount: invoiceAmount})
        },
        deleteInvoice: function(index){
            this.get('invoices').splice(index, 1)
        },
        openModalDialog: function (index) {
            console.log("controllers: ", index);
        }
    }
});
