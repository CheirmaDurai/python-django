class Product {
    constructor(id, name, description, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = 1;
    }
}

class ProductItem extends Product {
    constructor(id, name, description, price) {
        super(id, name, description, price);
    }

    render = () => {
        const htmlString = `
            <div class="product grid grid-cols-1 p-4 gap-4 text-gray-500 md:grid-cols-4 md:gap-0 md:items-center hover:bg-gray-50 transition" data-id="${this.id}">
                <div class="col-span-2">
                    <div class="product-name">${this.name}</div>
                    <div class="product-description">${this.description}</div>
                </div>
                <div class="product-price">${this.price.toFixed(2)}</div>
                <div class="actions">
                    <button id="btn-add-to-cart" class="add-to-cart bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200">Add to Cart</button>
                </div>
            </div>
        `;

        const productList = document.getElementById("products");
        productList.insertAdjacentHTML("beforeend", htmlString);
    }

    attachEventListeners = () => {
        const addToCartButton = document.querySelector(`.product[data-id="${this.id}"] .add-to-cart`);
        addToCartButton.addEventListener("click", () => {
            cart.addItem(this);
        });
    }
}

class Cart {
    constructor() {
        this.items = [];
    }

    addItem(productItem) {
        const existingItem = this.items.find(item => item.id === productItem.id);
        if (existingItem) {
            existingItem.quantity ++;
        } else {
            this.items.push(
                new Product(productItem.id, productItem.name, productItem.description, productItem.price)
            );
        }
        this.updateCartDisplay();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.updateCartDisplay();
    }

    attachedRemoveEventListener(productId) {
        const removeButton = document.querySelector(`.cart-product[data-id="${productId}"] .remove-from-cart`);
        if (removeButton) {
            removeButton.addEventListener("click", () => {
                this.removeItem(productId);
            });
        }
    }

    updateCartDisplay() {
        const cartList = document.getElementById("cart-products");
        cartList.innerHTML = "";

        let totalAmount = 0;
        let totalQuantity = 0;

        this.items.forEach(item => {
            const htmlString = `
                <div class="cart-product grid grid-cols-1 p-4 gap-2 text-gray-500 md:grid-cols-4 md:gap-0 md:items-center hover:bg-gray-50 transition" data-id="${item.id}">
                    <div class="product-name">${item.name}</div>
                    <div class="product-quantity">${item.quantity}</div>
                    <div class="product-price">${item.price.toFixed(2)}</div>
                    <div class="button-container">
                        <button id="btn-remove-from-cart" class="remove-from-cart bg-red-500 hover:bg-red-600 text-white p-2 rounded transition duration-200">Remove</button>
                    </div>
                </div>
            `;
            cartList.insertAdjacentHTML("beforeend", htmlString);
            totalAmount += item.price * item.quantity;
            totalQuantity += item.quantity;

            this.attachedRemoveEventListener(item.id);
        });

        document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
        document.getElementById("total-quantity").textContent = totalQuantity;
    }
}

const cart = new Cart();

const productItems = [
    new ProductItem(1, "Meals", "White rice + pappad", 19.99),
    new ProductItem(2, "Idly", "Buy 3 + Get 1 Free", 29.99),
    new ProductItem(3, "Plain Dosa", "Crispy", 39.99),
    new ProductItem(4, "Veg Combo", "Delicious vegetable combo", 49.99),
    new ProductItem(5, "Non-Veg Combo", "Chicken + Egg", 59.99),
    new ProductItem(6, "Cool Drinks Combo", "Bovonto + Sprite", 69.99),
];

// productItems.forEach(item => {
//     item.render();
//     item.attachEventListeners();
// });

let recipesPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(productItems);
    }, 1000);

    // throw new Error("Exception occurred."); // Trigger the rejection of the promise
    // reject(new Error("Failed to load products"));
});

console.log("Promise Initialized but not resolved...");
function renderProducts() {
    recipesPromise.then((recipes) => {
        console.log("Products loaded:", recipes);
        recipes.forEach(item => {
            item.render();
            item.attachEventListeners();
        });
        document.getElementById("spinner").classList.toggle("hidden");
    }).catch((error) => {
        console.error("Error loading products:", error);
        return error; // Return the error to propagate it to the next .then() in the chain
    }).then((error) => {
        console.log("Promise chain completed.", error ? "Error occurred: " + error.message : "No errors.");
    });
}

renderProducts();
console.log("Promise logic completed...");
