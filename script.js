
// objet pour le produit afin de stocker les propriétés pour l'id, le nom et le prix du produit.
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
// objet pour l'élément du panier d'achat afin de stocker les propriétés pour le produit et sa quantité.
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    // Méthode pour calculer le prix total
    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

//objet pour le panier d'achat qui contient un tableau d'instances de ShoppingCartItem.
class ShoppingCart {
    constructor() {
        this.items = [];
    }
    // Ajouter un produit au panier
    addItem(product) {
        let item = this.items.find(i => i.product.id === product.id);
        if (item) {
            item.quantity++;
        } else {
            this.items.push(new ShoppingCartItem(product, 1));
        }
        this.updateCartDisplay();
    }
    //supprimer un produit du panier
    removeItem(productId) {
     
        this.items = this.items.filter(item => item.product.id !== productId);

  
        let cardElement = document.querySelector(`[data-id='${productId}']`);
        if (cardElement) {
            cardElement.remove();
        }

        // mise a jour du panier
        this.updateCartDisplay();
    }
    //mise a jour la quantité d'un produit dans le panier
    updateQuantity(productId, change) {
        let item = this.items.find(i => i.product.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId); // Supprime l'élément si la quantité devient 0
            }
        }
        this.updateCartDisplay(); // Met à jour l'affichage du panier
    }
    //pour calculer le prix total du panier
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }

    //pour mettre à jour l'affichage du panier dans le DOM
    updateCartDisplay() {
  
        document.querySelector(".total").textContent = `${this.getTotalPrice()} $`;

        //Met à jour la quantité affichée pour chaque élément du panier
        this.items.forEach(item => {
            const quantityElement = document.querySelector(`[data-id='${item.product.id}'] .quantity`);
            if (quantityElement) {
                quantityElement.textContent = item.quantity;
            }
        });
    }
}

// Création d'une instance du panier
const cart = new ShoppingCart();

//Création d'une liste de produits
const products = [
    new Product(1, "Baskets", 100),
    new Product(2, "Socks", 20),
    new Product(3, "Bag", 50)
];

// événements aux boutons d'ajout, suppression et mise à jour de la quantité
document.querySelectorAll(".card").forEach((card, index) => {
    const product = products[index];
    card.setAttribute("data-id", product.id);

    //événement pour ajouter un produit au panie
    card.querySelector(".fa-plus-circle").addEventListener("click", () => {
        cart.addItem(product);
    });

    //événement pour diminuer la quantité d'un produit
    card.querySelector(".fa-minus-circle").addEventListener("click", () => {
        cart.updateQuantity(product.id, -1);
    });

    // événement pour supprimer un produit du panier
    card.querySelector(".fa-trash-alt").addEventListener("click", () => {
        cart.removeItem(product.id);
    });
});

// Gestion du bouton like & deslike

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
