let iconCart = document.querySelector('.cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart span');

let listProducts = [];
let carts = [];

// Toggle cart visibility
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Add products to HTML
const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <a href="detail.html?id=${product.id}" class="product-link">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

// Event listener for adding products to the cart
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
});

// Add to cart functionality
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

// Save cart to memory
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
};

// Update cart display
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="${info.name}">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>`;
            listCartHTML.appendChild(newCart);
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

// Event listener for changing quantity in cart
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantity(product_id, type);
    }
});

// Change quantity of products in cart
const changeQuantity = (product_id, type) => {
    console.log(`Changing quantity for product ID: ${product_id}, type: ${type}`);  // Debugging
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity += 1;
                break;
            default:
                if (carts[positionItemInCart].quantity > 1) {
                    carts[positionItemInCart].quantity -= 1;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
};
// initialize cart
const initCart = () => {
    if (localStorage.getItem('cart')) {
        carts = JSON.parse(localStorage.getItem('cart'));
        addCartToHTML();
    }
};

// Initialize application
const initApp = () => {
    // Fetch data from JSON
    fetch('products.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load product data');
            return response.json();
        })
        .then(data => {
            listProducts = data;
            addDataToHTML();

            // Get cart from memory
            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(error => console.error('Error fetching data:', error));  // Optional error handling
};

initApp();

// Timer JavaScript
const targetDate = new Date("Oct 30, 2024 12:00:00").getTime();

// Update the countdown every second
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    // Time calculations for days, hours, minutes, and seconds
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display the result in the element with id="countdown"
    document.getElementById("countdown").innerHTML = 
        `Time Left: ${days}d : ${hours}h : ${minutes}m : ${seconds}s`;

    // If the countdown is finished, display "Expired"
    if (timeLeft < 0) {
        clearInterval(countdown);
        document.getElementById("countdown").innerHTML = "Expired";
    }
}, 1000);

// Pop-up observer
const popUpElements = document.querySelectorAll('.pop-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
popUpElements.forEach(element => {
    observer.observe(element);
});

// Typing effect for text
const texts = [
    "Shopping And Department Store.",
    "Shop items you love at amazing prices."
];

let currentTextIndex = 0;

function typeText(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        setTimeout(() => typeText(element, text, i + 1), 100); // Typing speed
    } else {
        setTimeout(() => {
            element.innerHTML = ''; // Clear text for next line
            currentTextIndex = (currentTextIndex + 1) % texts.length; // Cycle through texts
            typeText(element, texts[currentTextIndex], 0);
        }, 2000); // Pause before next text starts
    }
}

const element = document.querySelector('.typing-effect');
typeText(element, texts[currentTextIndex]);
