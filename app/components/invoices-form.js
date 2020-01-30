import Component from '@ember/component';
Array.prototype.sortBy = function () {
    function _sortByAttr(attr) {
        var sortOrder = 1;
        if (attr[0] == "-") {
            sortOrder = -1;
            attr = attr.substr(1);
        }
        return function (a, b) {
            var result = (a[attr] < b[attr]) ? -1 : (a[attr] > b[attr]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    function _getSortFunc() {
        if (arguments.length == 0) {
            throw "Zero length arguments not allowed for Array.sortBy()";
        }
        var args = arguments;
        return function (a, b) {
            for (var result = 0, i = 0; result == 0 && i < args.length; i++) {
                result = _sortByAttr(args[i])(a, b);
            }
            return result;
        }
    }
    return this.sort(_getSortFunc.apply(null, arguments));
}
export default Component.extend({
    tagName: '',
    newDate: new Date().toISOString().slice(0, 10),
    isShowingUpdateModalDialog: false,
    isShowingDeleteConfirmModalDialog: false,
    selectedIndex: -1,
    selectedInvoiceDueDate: "",
    selectedInvoiceAmount: "",
    deletingInvoiceIndex: -1,
    deletingInvoiceNumber: "",
    selectedCriteria: "",
    invoices: [
        { dueDate: '2020/01/29', num: '27478399374', amount: '1500' },
        { dueDate: '2020/01/25', num: '29937474783', amount: '2500' },
        { dueDate: '2020/01/30', num: '27783993474', amount: '3500' },
    ],
    actions: {
        addInvoice: function () {
            if (this.get("isShowingUpdateModalDialog") || this.get("isShowingDeleteConfirmModalDialog"))
                return;
            let invoiceNumber = (Math.floor(Math.random() * (99999999999 - 10000000000)) + 10000000000).toString() + "";
            let invoiceAmount = this.get('invoiceAmount');
            if (!invoiceAmount || invoiceAmount == "") {
                invoiceAmount = "0";
            }
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
            this.set('isShowingUpdateModalDialog', false);
        },
        deleteInvoice: function (index) {
            if (this.get("isShowingUpdateModalDialog"))
                return;
            this.set("deletingInvoiceNumber", this.get("invoices").objectAt(index).num);
            this.set("isShowingDeleteConfirmModalDialog", true);
            this.set("deletingInvoiceIndex", index);
        },
        confirmDelete: function () {
            this.get('invoices').removeAt(this.get("deletingInvoiceIndex"));
            this.set("isShowingDeleteConfirmModalDialog", false);
        },
        openUpdateDialog(index) {
            if (this.get("isShowingDeleteConfirmModalDialog"))
                return;
            this.set("selectedIndex", index);
            let invoice = this.get("invoices").objectAt(index);
            this.set("selectedInvoiceDueDate", invoice.dueDate);
            this.set("selectedInvoiceAmount", invoice.amount);
            this.set('isShowingUpdateModalDialog', true);
        },
        closeModalDialog() {
            this.set('isShowingUpdateModalDialog', false);
        },
        openDatePicker: function () {
            // this.set("newDate", new Date().toISOString().slice(0, 10));
        },
        sort: function (criteria) {
            if (this.get("selectedCriteria") == criteria) {
                this.get("invoices").reverse();
                let arrObj = Array.from(this.get("invoices"));
                for (let i = 0; i < arrObj.length; i++) {
                    this.get("invoices").replace(i, 1, [arrObj.objectAt(i)]);
                }
            }
            else {
                this.set("selectedCriteria", criteria)
                if (this.get("isShowingUpdateModalDialog") || this.get("isShowingDeleteConfirmModalDialog"))
                    return;
                if (this.get("invoices").length == 0)
                    return;
                let arrObj = Array.from(this.get("invoices"));
                arrObj = arrObj.sortBy(criteria);
                for (let i = 0; i < arrObj.length; i++) {
                    this.get("invoices").replace(i, 1, [arrObj.objectAt(i)]);
                }
            }
        }
    }
});