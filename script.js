const stockForm = document.getElementById("stockForm");

const productIdInput = document.getElementById("productId");
const productNameInput = document.getElementById("productName");
const categoryInput = document.getElementById("category");
const quantityInput = document.getElementById("quantity");
const priceInput = document.getElementById("price");
const supplierInput = document.getElementById("supplier");

const stockTableBody = document.getElementById("stockTableBody");
const emptyMessage = document.getElementById("emptyMessage");
const totalProducts = document.getElementById("totalProducts");

const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");

const searchInput = document.getElementById("searchInput");


/*
    Load existing stock from browser storage.
    If there is no stock, start with an empty array.
*/

let stocks = JSON.parse(localStorage.getItem("stocks")) || [];

let editingIndex = null;


/* SAVE DATA */

function saveStocks() {

    localStorage.setItem(
        "stocks",
        JSON.stringify(stocks)
    );

}


/* DISPLAY STOCK */

function displayStocks(stockList = stocks) {

    stockTableBody.innerHTML = "";

    if (stockList.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    stockList.forEach((stock) => {

        const actualIndex = stocks.indexOf(stock);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(stock.productId)}</td>

            <td>${escapeHTML(stock.productName)}</td>

            <td>${escapeHTML(stock.category)}</td>

            <td>${stock.quantity}</td>

            <td>$${Number(stock.price).toFixed(2)}</td>

            <td>${escapeHTML(stock.supplier)}</td>

            <td>
                <button
                    class="update-btn"
                    onclick="editStock(${actualIndex})"
                >
                    Update
                </button>
            </td>
        `;

        stockTableBody.appendChild(row);

    });


    totalProducts.textContent = stocks.length;
}


/* ADD / UPDATE STOCK */

stockForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const productId = productIdInput.value.trim();

    const productName = productNameInput.value.trim();

    const category = categoryInput.value;

    const quantity = Number(quantityInput.value);

    const price = Number(priceInput.value);

    const supplier = supplierInput.value.trim();


    if (
        productId === "" ||
        productName === "" ||
        category === "" ||
        supplier === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    if (quantity < 0 || price < 0) {

        alert("Quantity and price cannot be negative.");

        return;
    }


    const stock = {

        productId: productId,

        productName: productName,

        category: category,

        quantity: quantity,

        price: price,

        supplier: supplier

    };


    /*
        ADD NEW PRODUCT
    */

    if (editingIndex === null) {

        const duplicate = stocks.some(
            item =>
                item.productId.toLowerCase() ===
                productId.toLowerCase()
        );


        if (duplicate) {

            alert("Product ID already exists.");

            return;
        }


        stocks.push(stock);

        alert("Stock added successfully!");

    }

    /*
        UPDATE EXISTING PRODUCT
    */

    else {

        stocks[editingIndex] = stock;

        alert("Stock updated successfully!");

        editingIndex = null;

        submitButton.textContent = "Add Product";

        cancelButton.classList.add("hidden");

        productIdInput.disabled = false;

    }


    saveStocks();

    displayStocks();

    stockForm.reset();

});


/* EDIT STOCK */

function editStock(index) {

    const stock = stocks[index];


    productIdInput.value = stock.productId;

    productNameInput.value = stock.productName;

    categoryInput.value = stock.category;

    quantityInput.value = stock.quantity;

    priceInput.value = stock.price;

    supplierInput.value = stock.supplier;


    editingIndex = index;


    /*
        Product ID cannot be changed during update.
    */

    productIdInput.disabled = true;


    submitButton.textContent = "Save Changes";

    cancelButton.classList.remove("hidden");


    /*
        Scroll user to form.
    */

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* CANCEL UPDATE */

cancelButton.addEventListener("click", function() {

    editingIndex = null;

    stockForm.reset();

    productIdInput.disabled = false;

    submitButton.textContent = "Add Product";

    cancelButton.classList.add("hidden");

});


/* SEARCH STOCK */

searchInput.addEventListener("input", function() {

    const searchValue =
        searchInput.value.toLowerCase().trim();


    const filteredStocks = stocks.filter((stock) => {

        return (

            stock.productId
                .toLowerCase()
                .includes(searchValue)

            ||

            stock.productName
                .toLowerCase()
                .includes(searchValue)

            ||

            stock.category
                .toLowerCase()
                .includes(searchValue)

            ||

            stock.supplier
                .toLowerCase()
                .includes(searchValue)

        );

    });


    displayStocks(filteredStocks);

});


/* BASIC HTML ESCAPING */

function escapeHTML(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* INITIAL DISPLAY */

displayStocks();