// ================= SELECT ELEMENTS =================
const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const historyBtn = document.getElementById("historyBtn");
const suggestionBox = document.getElementById("suggestions");

let products = [];

// ================= FETCH PRODUCTS =================
fetch("https://dummyjson.com/products")
    .then(response => response.json())
    .then(data => {
        products = data.products;
        displayProducts(products);
    })
    .catch(error => console.log("Error:", error));

// ================= DISPLAY PRODUCTS =================
function displayProducts(list) {
    container.innerHTML = "";

    list.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">₹ ${product.price}</p>
            <p class="rating">⭐ ${product.rating}</p>
        `;

        container.appendChild(card);
    });
}

// ================= FILTER PRODUCTS (NO HISTORY) =================
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        displayProducts(products);
        return;
    }

    const filtered = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    displayProducts(filtered);
}

// ================= SAVE HISTORY (ONLY STRINGS) =================
function saveHistory(query) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // avoid duplicates
    if (!history.includes(query)) {
        history.unshift(query); // latest search first
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
}

// ================= SHOW HISTORY =================
function showHistory() {
    suggestionBox.innerHTML = "";

    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (history.length === 0) {
        suggestionBox.innerHTML = "<p>No history found</p>";
        return;
    }

    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerText = item; // item is STRING

        // Click history → search again
        div.addEventListener("click", () => {
            searchInput.value = item;
            handleSearch();
            suggestionBox.innerHTML = "";
        });

        suggestionBox.appendChild(div);
    });
}

// ================= EVENT LISTENERS =================

// Typing → only filter products
searchInput.addEventListener("keyup", handleSearch);

// Search button → filter + save history
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    handleSearch();
    saveHistory(query);
});

// Show History button → show saved history
historyBtn.addEventListener("click", showHistory);
