const container = document.getElementById("product-container");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

let products = [];

/* ================= FETCH PRODUCTS ================= */
fetch("https://dummyjson.com/products")
.then(response => response.json())
.then(data => {
    products = data.products;
    displayProducts(products);
})
.catch(error => {
    console.log("Error:", error);
});

/* ================= DISPLAY PRODUCTS ================= */
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

/* ================= SEARCH FUNCTION ================= */
function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();

    if (query === "") {
        displayProducts(products);
        return;
    }

    // Filter products
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(query)
    );

    displayProducts(filteredProducts);

    // Save search history
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    if (!history.some(item => item.query === query)) {
        history.push({
            query: query,
            time: new Date().toLocaleString()
        });
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
}

/* ================= EVENT LISTENERS ================= */

// Search on typing
searchInput.addEventListener("keyup", handleSearch);

// Search on button click
searchBtn.addEventListener("click", handleSearch);
