fetch("https://dummyjson.com/products")
.then(response => response.json())
.then(data => {
    const products = data.products;
    const container = document.getElementById("product-container");

    products.forEach(product => {
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
})
.catch(error => {
    console.log("Error:", error);
});
