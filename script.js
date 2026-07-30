/* ========================================
   STOCKFLOW PURCHASE MANAGEMENT
======================================== */


/* ========================================
   INITIAL DATA
======================================== */

const defaultPurchases = [

    {
        purchaseId: "PUR-1001",
        invoiceNumber: "INV-2026-1001",
        date: "2026-07-26",
        supplier: "ABC Distributors",
        product: "Dell Wireless Mouse",
        quantity: 50,
        unitPrice: 620,
        taxRate: 0,
        subtotal: 31000,
        taxAmount: 0,
        total: 31000,
        batchNumber: "LOT-001",
        expiryDate: "",
        paymentMethod: "UPI",
        paymentStatus: "Paid",
        notes: ""
    },

    {
        purchaseId: "PUR-1002",
        invoiceNumber: "INV-2026-1002",
        date: "2026-07-27",
        supplier: "TechSource India",
        product: "USB Keyboard",
        quantity: 50,
        unitPrice: 970,
        taxRate: 0,
        subtotal: 48500,
        taxAmount: 0,
        total: 48500,
        batchNumber: "LOT-002",
        expiryDate: "",
        paymentMethod: "Bank Transfer",
        paymentStatus: "Pending",
        notes: ""
    },

    {
        purchaseId: "PUR-1003",
        invoiceNumber: "INV-2026-1003",
        date: "2026-07-28",
        supplier: "Prime Supplies",
        product: "A4 Paper",
        quantity: 100,
        unitPrice: 124,
        taxRate: 0,
        subtotal: 12400,
        taxAmount: 0,
        total: 12400,
        batchNumber: "LOT-003",
        expiryDate: "",
        paymentMethod: "Cash",
        paymentStatus: "Paid",
        notes: ""
    }

];


/* ========================================
   GET PURCHASES
======================================== */

function getPurchases() {

    const savedPurchases =
        localStorage.getItem("stockflowPurchases");

    if (savedPurchases) {

        try {

            const parsed = JSON.parse(savedPurchases);

            if (Array.isArray(parsed)) {
                return parsed;
            }

        } catch (error) {

            console.error(
                "Could not load saved purchases.",
                error
            );

        }

    }


    localStorage.setItem(
        "stockflowPurchases",
        JSON.stringify(defaultPurchases)
    );


    return [...defaultPurchases];
}


let purchases = getPurchases();


/* ========================================
   SAVE PURCHASES
======================================== */

function savePurchasesToStorage() {

    localStorage.setItem(
        "stockflowPurchases",
        JSON.stringify(purchases)
    );

}


/* ========================================
   FORMAT MONEY
======================================== */

function formatMoney(amount) {

    return new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR"
        }
    ).format(amount);

}


/* ========================================
   FORMAT DATE
======================================== */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const parts = dateString.split("-");

    if (parts.length !== 3) {
        return dateString;
    }

    const date = new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* ========================================
   GENERATE PURCHASE ID
======================================== */

function generatePurchaseId() {

    let highestNumber = 1000;

    purchases.forEach(function (purchase) {

        const number =
            Number(
                String(purchase.purchaseId)
                    .replace("PUR-", "")
            );

        if (
            Number.isFinite(number) &&
            number > highestNumber
        ) {

            highestNumber = number;

        }

    });


    return `PUR-${highestNumber + 1}`;

}


/* ========================================
   GENERATE INVOICE NUMBER
======================================== */

function generateInvoiceNumber() {

    const year =
        new Date().getFullYear();

    let highestNumber = 1000;


    purchases.forEach(function (purchase) {

        if (!purchase.invoiceNumber) {
            return;
        }


        const parts =
            purchase.invoiceNumber.split("-");

        const number =
            Number(parts[parts.length - 1]);


        if (
            Number.isFinite(number) &&
            number > highestNumber
        ) {

            highestNumber = number;

        }

    });


    return `INV-${year}-${highestNumber + 1}`;

}


/* ========================================
   OPEN PURCHASE FORM
======================================== */

function openPurchaseForm() {

    const section =
        document.getElementById(
            "purchaseFormSection"
        );


    if (!section) {
        return;
    }


    document.getElementById(
        "purchaseId"
    ).value = generatePurchaseId();


    document.getElementById(
        "invoiceNumber"
    ).value = generateInvoiceNumber();


    const dateInput =
        document.getElementById(
            "purchaseDate"
        );


    if (dateInput) {

        dateInput.value =
            getTodayDate();

    }


    calculateTotal();


    section.classList.remove(
        "hidden"
    );


    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* ========================================
   CLOSE PURCHASE FORM
======================================== */

function closePurchaseForm() {

    const section =
        document.getElementById(
            "purchaseFormSection"
        );


    if (section) {

        section.classList.add(
            "hidden"
        );

    }

}


/* ========================================
   GET TODAY
======================================== */

function getTodayDate() {

    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


/* ========================================
   CALCULATE TOTAL
======================================== */

function calculateTotal() {

    const quantity =
        Number(
            document.getElementById(
                "quantity"
            )?.value
        ) || 0;


    const unitPrice =
        Number(
            document.getElementById(
                "unitPrice"
            )?.value
        ) || 0;


    const taxRate =
        Number(
            document.getElementById(
                "tax"
            )?.value
        ) || 0;


    const subtotal =
        quantity * unitPrice;


    const taxAmount =
        subtotal *
        (taxRate / 100);


    const total =
        subtotal +
        taxAmount;


    document.getElementById(
        "subtotal"
    ).textContent =
        formatMoney(subtotal);


    document.getElementById(
        "taxAmount"
    ).textContent =
        formatMoney(taxAmount);


    document.getElementById(
        "grandTotal"
    ).textContent =
        formatMoney(total);

}


/* ========================================
   SAVE PURCHASE
======================================== */

function savePurchase(event) {

    event.preventDefault();


    const purchaseId =
        document.getElementById(
            "purchaseId"
        ).value;


    const invoiceNumber =
        document.getElementById(
            "invoiceNumber"
        ).value;


    const date =
        document.getElementById(
            "purchaseDate"
        ).value;


    const supplier =
        document.getElementById(
            "supplier"
        ).value;


    const product =
        document.getElementById(
            "product"
        ).value;


    const quantity =
        Number(
            document.getElementById(
                "quantity"
            ).value
        );


    const unitPrice =
        Number(
            document.getElementById(
                "unitPrice"
            ).value
        );


    const taxRate =
        Number(
            document.getElementById(
                "tax"
            ).value
        ) || 0;


    const batchNumber =
        document.getElementById(
            "batchNumber"
        ).value;


    const expiryDate =
        document.getElementById(
            "expiryDate"
        ).value;


    const paymentMethod =
        document.getElementById(
            "paymentMethod"
        ).value;


    const paymentStatus =
        document.getElementById(
            "paymentStatus"
        ).value;


    const notes =
        document.getElementById(
            "notes"
        ).value;


    if (
        !purchaseId ||
        !invoiceNumber ||
        !date ||
        !supplier ||
        !product ||
        !Number.isFinite(quantity) ||
        quantity <= 0 ||
        !Number.isFinite(unitPrice) ||
        unitPrice < 0
    ) {

        alert(
            "Please enter valid purchase information."
        );

        return;

    }


    const subtotal =
        quantity * unitPrice;


    const taxAmount =
        subtotal *
        (taxRate / 100);


    const total =
        subtotal +
        taxAmount;


    const purchase = {

        purchaseId,

        invoiceNumber,

        date,

        supplier,

        product,

        quantity,

        unitPrice,

        taxRate,

        subtotal,

        taxAmount,

        total,

        batchNumber,

        expiryDate,

        paymentMethod,

        paymentStatus,

        notes

    };


    purchases.push(
        purchase
    );


    savePurchasesToStorage();


    renderPurchaseTable();

    updateDashboard();


    document.getElementById(
        "purchaseForm"
    ).reset();


    closePurchaseForm();


    showInvoice(
        purchase
    );

}


/* ========================================
   RENDER PURCHASE TABLE
======================================== */

function renderPurchaseTable() {

    const tableBody =
        document.getElementById(
            "purchaseTableBody"
        );


    if (!tableBody) {
        return;
    }


    tableBody.innerHTML = "";


    const reversedPurchases =
        [...purchases].reverse();


    reversedPurchases.forEach(
        function (purchase) {

            const row =
                document.createElement(
                    "tr"
                );


            const statusClass =
                getStatusClass(
                    purchase.paymentStatus
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHtml(purchase.purchaseId)}
                    </strong>
                </td>

                <td>
                    ${escapeHtml(purchase.invoiceNumber)}
                </td>

                <td>
                    ${formatDate(purchase.date)}
                </td>

                <td>
                    ${escapeHtml(purchase.supplier)}
                </td>

                <td>
                    ${escapeHtml(purchase.product)}
                </td>

                <td>
                    ${purchase.quantity}
                </td>

                <td>
                    <strong>
                        ${formatMoney(purchase.total)}
                    </strong>
                </td>

                <td>

                    <span class="status ${statusClass}">
                        ${escapeHtml(purchase.paymentStatus)}
                    </span>

                </td>

                <td>

                    <button
                        class="invoice-btn"
                        type="button"
                        data-purchase-id="${escapeHtml(purchase.purchaseId)}">

                        View

                    </button>

                </td>

            `;


            const invoiceButton =
                row.querySelector(
                    ".invoice-btn"
                );


            invoiceButton.addEventListener(
                "click",
                function () {

                    viewInvoice(
                        purchase.purchaseId
                    );

                }
            );


            tableBody.appendChild(
                row
            );

        }
    );

}


/* ========================================
   STATUS CLASS
======================================== */

function getStatusClass(status) {

    const value =
        String(status)
            .toLowerCase();


    if (value === "paid") {

        return "completed";

    }


    if (value === "pending") {

        return "pending";

    }


    return "partial";

}


/* ========================================
   UPDATE SUMMARY
======================================== */

function updateDashboard() {

    const purchaseCount =
        purchases.length;


    const totalValue =
        purchases.reduce(
            function (sum, purchase) {

                return sum +
                    Number(purchase.total || 0);

            },
            0
        );


    const completed =
        purchases.filter(
            function (purchase) {

                return (
                    purchase.paymentStatus ===
                    "Paid"
                );

            }
        ).length;


    const pending =
        purchases.filter(
            function (purchase) {

                return (
                    purchase.paymentStatus !==
                    "Paid"
                );

            }
        ).length;


    document.getElementById(
        "purchaseCount"
    ).textContent =
        purchaseCount;


    document.getElementById(
        "purchaseValue"
    ).textContent =
        formatMoney(totalValue);


    document.getElementById(
        "completedCount"
    ).textContent =
        completed;


    document.getElementById(
        "pendingCount"
    ).textContent =
        pending;

}


/* ========================================
   SEARCH PURCHASES
======================================== */

function searchPurchases() {

    const searchInput =
        document.getElementById(
            "purchaseSearch"
        );


    const table =
        document.getElementById(
            "purchaseTable"
        );


    if (
        !searchInput ||
        !table
    ) {

        return;

    }


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const rows =
        table.querySelectorAll(
            "tbody tr"
        );


    rows.forEach(
        function (row) {

            const text =
                row.textContent
                    .toLowerCase();


            row.style.display =
                text.includes(search)
                    ? ""
                    : "none";

        }
    );

}


/* ========================================
   VIEW EXISTING INVOICE
======================================== */

function viewInvoice(
    purchaseId
) {

    const purchase =
        purchases.find(
            function (item) {

                return (
                    item.purchaseId ===
                    purchaseId
                );

            }
        );


    if (!purchase) {

        alert(
            "Purchase could not be found."
        );

        return;

    }


    showInvoice(
        purchase
    );

}


/* ========================================
   SHOW INVOICE
======================================== */

function showInvoice(
    purchase
) {

    setText(
        "invoiceDisplayNumber",
        purchase.invoiceNumber
    );


    setText(
        "invoicePurchaseId",
        purchase.purchaseId
    );


    setText(
        "invoiceDate",
        formatDate(purchase.date)
    );


    setText(
        "invoiceSupplier",
        purchase.supplier
    );


    setText(
        "invoicePaymentMethod",
        purchase.paymentMethod
    );


    setText(
        "invoiceProduct",
        purchase.product
    );


    setText(
        "invoiceQuantity",
        purchase.quantity
    );


    setText(
        "invoiceUnitPrice",
        formatMoney(
            purchase.unitPrice
        )
    );


    setText(
        "invoiceProductTotal",
        formatMoney(
            purchase.subtotal
        )
    );


    setText(
        "invoiceBatch",
        purchase.batchNumber ||
        "-"
    );


    setText(
        "invoicePaymentStatus",
        purchase.paymentStatus
    );


    setText(
        "invoiceNotes",
        purchase.notes ||
        "-"
    );


    setText(
        "invoiceSubtotal",
        formatMoney(
            purchase.subtotal
        )
    );


    setText(
        "invoiceTax",
        `${formatMoney(
            purchase.taxAmount
        )} (${purchase.taxRate}%)`
    );


    setText(
        "invoiceTotal",
        formatMoney(
            purchase.total
        )
    );


    const modal =
        document.getElementById(
            "invoiceModal"
        );


    modal.classList.remove(
        "hidden"
    );

}


/* ========================================
   SET TEXT
======================================== */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value;

    }

}


/* ========================================
   CLOSE INVOICE
======================================== */

function closeInvoice() {

    const modal =
        document.getElementById(
            "invoiceModal"
        );


    if (modal) {

        modal.classList.add(
            "hidden"
        );

    }

}


/* ========================================
   PRINT INVOICE
======================================== */

function printInvoice() {

    window.print();

}


/* ========================================
   BASIC HTML ESCAPING
======================================== */

function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


/* ========================================
   INITIALIZE PAGE
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        renderPurchaseTable();

        updateDashboard();


        const dateInput =
            document.getElementById(
                "purchaseDate"
            );


        if (dateInput) {

            dateInput.value =
                getTodayDate();

        }

    }
);