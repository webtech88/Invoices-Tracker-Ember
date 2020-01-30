import Component from '@ember/component';

export default Component.extend({
    tagName: '',
    isShowingModalDialog: false,
    selectedIndex: 0,
    selectedInvoiceNum: "",
    selectedInvoiceAmount: "",
    invoices: [
        { num: '1', amount: '1500' },
        { num: '2', amount: '2000' },
        { num: '3', amount: '3000' }
    ],
    actions: {
        addInvoice: function () {
            if (this.get("isShowingModalDialog"))
                return;
            let invoiceNumber = this.get('invoiceNumber');
            let invoiceAmount = this.get('invoiceAmount');
            this.get('invoices').pushObject({ num: invoiceNumber, amount: invoiceAmount })
        },
        updateInvoice: function () {
            let index = this.get("selectedIndex");
            let currentInvoice = this.get("invoices").objectAt(index);
            console.log("current num: ", currentInvoice.num);
            console.log("current amount: ", currentInvoice.amount);
            currentInvoice = { num: this.get("selectedInvoiceNum"), amount: this.get("selectedInvoiceAmount") }
            this.get("invoices").replace(index, 1, [currentInvoice]);
            this.set('isShowingModalDialog', false);
        },
        deleteInvoice: function (index) {
            if (this.get("isShowingModalDialog"))
                return;
            this.get('invoices').removeAt(index)
        },
        openModalDialog(index) {
            this.set("selectedIndex", index);
            let invoice = this.get("invoices").objectAt(index);
            this.set("selectedInvoiceNum", invoice.num);
            this.set("selectedInvoiceAmount", invoice.amount);
            this.set('isShowingModalDialog', true);
        },
        closeModalDialog() {
            this.set('isShowingModalDialog', false);
        }
    }
});