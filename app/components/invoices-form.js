import Component from '@ember/component';

export default Component.extend({
    tagName: '',
    newDate: new Date().toISOString().slice(0, 10),
    isShowingModalDialog: false,
    selectedIndex: 0,
    selectedInvoiceDueDate: "",
    selectedInvoiceAmount: "",
    invoices: [
        { dueDate: '2020/01/30', num: '27478399374', amount: '1500' },
        { dueDate: '2020/01/30', num: '29937474783', amount: '2500' },
        { dueDate: '2020/01/30', num: '27783993474', amount: '3500' },
    ],
    actions: {
        addInvoice: function () {
            if (this.get("isShowingModalDialog"))
                return;
            let invoiceNumber = (Math.floor(Math.random() * (99999999999 - 10000000000)) + 10000000000).toString() + "";
            let invoiceAmount = this.get('invoiceAmount');
            let selectedDate = new Date(this.get("newDate"));
            let y = "0000" + selectedDate.getFullYear().toString();
            y = y.slice(y.length - 4, y.length);
            let m = "00" + (selectedDate.getMonth() + 1).toString();
            m = m.slice(m.length - 2, m.length);
            let d = "00" + selectedDate.getDate().toString();
            d = d.slice(d.length - 2, d.length);
            this.get('invoices').pushObject({ dueDate: y + "/" + m + "/" + d, num: invoiceNumber, amount: invoiceAmount })
        },
        updateInvoice: function () {
            let index = this.get("selectedIndex");
            let currentInvoice = this.get("invoices").objectAt(index);
            let selectedDate = new Date(this.get("selectedInvoiceDueDate"));
            let y = "0000" + selectedDate.getFullYear().toString();
            y = y.slice(y.length - 4, y.length);
            let m = "00" + (selectedDate.getMonth() + 1).toString();
            m = m.slice(m.length - 2, m.length);
            let d = "00" + selectedDate.getDate().toString();
            d = d.slice(d.length - 2, d.length);
            currentInvoice = { dueDate: y + "/" + m + "/" + d, num: currentInvoice.num, amount: this.get("selectedInvoiceAmount") }
            this.get("invoices").replace(index, 1, [currentInvoice]);
            this.set('isShowingModalDialog', false);
        },
        deleteInvoice: function (index) {
            if (this.get("isShowingModalDialog"))
                return;
            this.get('invoices').removeAt(index)
        },
        openUpdateDialog(index) {
            this.set("selectedIndex", index);
            let invoice = this.get("invoices").objectAt(index);
            this.set("selectedInvoiceDueDate", invoice.dueDate);
            this.set("selectedInvoiceAmount", invoice.amount);
            this.set('isShowingModalDialog', true);
        },
        closeModalDialog() {
            this.set('isShowingModalDialog', false);
        },
        openDatePicker: function () {
            // this.set("newDate", new Date().toISOString().slice(0, 10));
        },
    }
});