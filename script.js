
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product) {
        let item = this.items.find(i => i.product.id === product.id);
        if (item) {
            item.quantity++;
        } else {
            this.items.push(new ShoppingCartItem(product, 1));
        }
        this.updateCartDisplay();
    }

    removeItem(productId) {
     
        this.items = this.items.filter(item => item.product.id !== productId);

  
        let cardElement = document.querySelector(`[data-id='${productId}']`);
        if (cardElement) {
            cardElement.remove();
        }

     
        this.updateCartDisplay();
    }

    updateQuantity(productId, change) {
        let item = this.items.find(i => i.product.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            }
        }
        this.updateCartDisplay();
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    updateCartDisplay() {
  
        document.querySelector(".total").textContent = `${this.getTotalPrice()} $`;

      
        this.items.forEach(item => {
            const quantityElement = document.querySelector(`[data-id='${item.product.id}'] .quantity`);
            if (quantityElement) {
                quantityElement.textContent = item.quantity;
            }
        });
    }
}


const cart = new ShoppingCart();


const products = [
    new Product(1, "Baskets", 100),
    new Product(2, "Socks", 20),
    new Product(3, "Bag", 50)
];


document.querySelectorAll(".card").forEach((card, index) => {
    const product = products[index];
    card.setAttribute("data-id", product.id);

   
    card.querySelector(".fa-plus-circle").addEventListener("click", () => {
        cart.addItem(product);
    });

    
    card.querySelector(".fa-minus-circle").addEventListener("click", () => {
        cart.updateQuantity(product.id, -1);
    });

    
    card.querySelector(".fa-trash-alt").addEventListener("click", () => {
        cart.removeItem(product.id);
    });
});


document.querySelectorAll(".fa-heart").forEach(heart => {
    heart.addEventListener("click", () => {
        if (heart.classList.contains("liked")) {
            heart.classList.remove("liked");
            heart.style.color = "black";
        } else {
            heart.classList.add("liked");
            heart.style.color = "red";
        }
    });
});
