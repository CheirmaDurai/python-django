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
                    <button id="btn-add-to-cart" class="add-to-cart bg-green-100 hover:bg-gray-100 text-green-700 p-4">Add to Cart</button>
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

        this.items.forEach(item => {
            const htmlString = `
                <div class="cart-product grid grid-cols-1 p-4 gap-2 text-gray-500 md:grid-cols-4 md:gap-0 md:items-center hover:bg-gray-50 transition" data-id="${item.id}">
                    <div class="product-name">${item.name}</div>
                    <div class="product-price text-center">${item.price.toFixed(2)}</div>
                    <div class="product-quantity text-center">${item.quantity}</div>
                    <div class="button-container">
                        <button id="btn-remove-from-cart" class="remove-from-cart bg-green-100 hover:bg-gray-100 text-green-700 p-4 text-xs">Remove</button>
                    </div>
                </div>
            `;
            cartList.insertAdjacentHTML("beforeend", htmlString);
            totalAmount += item.price * item.quantity;

            this.attachedRemoveEventListener(item.id);
        });

        document.getElementById("total-amount").textContent = totalAmount.toFixed(2);
    }
}

const cart = new Cart();

const productItems = [
    new ProductItem(1, "Meals", "White rice + pappad", 19.99),
    new ProductItem(2, "Idly", "Buy 3 + Get 1 Free", 29.99),
    new ProductItem(3, "Plain Dosa", "Crispy", 39.99),
    new ProductItem(4, "Veg Combo", "Delicious vegetable combo", 49.99),
    new ProductItem(5, "Non-Veg Combo", "Chicken + Egg", 59.99),
    new ProductItem(6, "Cold Drinks Combo", "Bovonto + Sprite", 69.99),
];

productItems.forEach(item => {
    item.render();
    item.attachEventListeners();
});


