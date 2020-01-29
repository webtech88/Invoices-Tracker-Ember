import Component from '@ember/component';

export default Component.extend({
    tagName: '',
    isShowingModalDialog: false,
    selectedIndex: 0,
    selectedInvoiceNum: "",
    selectedInvoicePrice: "",
    invoices: [
        { num: '1', price: '1500' },
        { num: '2', price: '2000' },
        { num: '3', price: '3000' }
    ],
    actions: {
        addInvoice: function () {
            let invoiceNumber = this.get('invoiceNumber');
            let invoicePrice = this.get('invoicePrice');
            this.get('invoices').pushObject({ num: invoiceNumber, price: invoicePrice })
        },
        updateInvoice: function () {
            let index = this.get("selectedIndex");
            let currentInvoice = this.get("invoices").objectAt(index);
            console.log("current num: ", currentInvoice.num);
            console.log("current price: ", currentInvoice.price);
            currentInvoice = { num: this.get("selectedInvoiceNum"), price: this.get("selectedInvoicePrice") }
            this.get("invoices").replace(index, 1, [currentInvoice]);
            this.set('isShowingModalDialog', false);
        },
        deleteInvoice: function (index) {
            this.get('invoices').removeAt(index)
        },
        openModalDialog(index) {
            this.set("selectedIndex", index);
            let invoice = this.get("invoices").objectAt(index);
            this.set("selectedInvoiceNum", invoice.num);
            this.set("selectedInvoicePrice", invoice.price);
            this.set('isShowingModalDialog', true);
        },
        closeModalDialog() {
            this.set('isShowingModalDialog', false);
        }
    }
});