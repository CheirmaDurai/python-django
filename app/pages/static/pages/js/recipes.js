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
            <div class="grid grid-cols-4 gap-4 p-4 product" data-id="${this.id}">
                <div class="col-span-2">
                    <div class="product-name">${this.name}</div>
                    <div class="product-description">${this.description}</div>
                </div>
                <div class="col-span-1 product-price">${this.price.toFixed(2)}</div>
                <div class="col-span-1 button-container">
                    <button id="btn-add-to-cart" class="add-to-cart bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">Add to Cart</button>
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
                <div class="grid grid-cols-4 gap-4 p-4 cart-product" data-id="${item.id}">
                    <div class="product-name">${item.name}</div>
                    <div class="product-price">${item.price.toFixed(2)}</div>
                    <div class="product-quantity">${item.quantity}</div>
                    <div class="button-container">
                        <button id="btn-remove-from-cart" class="remove-from-cart bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-200">Remove</button>
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
    new ProductItem(1, "Product 1", "Description for Product 1", 19.99),
    new ProductItem(2, "Product 2", "Description for Product 2", 29.99),
    new ProductItem(3, "Product 3", "Description for Product 3", 39.99),
    new ProductItem(4, "Product 4", "Description for Product 4", 49.99),
    new ProductItem(5, "Product 5", "Description for Product 5", 59.99),
    new ProductItem(6, "Product 6", "Description for Product 6", 69.99),
];

productItems.forEach(item => {
    item.render();
    item.attachEventListeners();
});


