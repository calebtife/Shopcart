let iconCart = document.querySelector('.cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.cart span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = "";
    if (listProducts.length > 0) {
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
        });
    }
};
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else {
        carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    $${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>`;
        listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totalQuantity;
}
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) => {
    console.log(`Changing quantity for product ID: ${product_id}, type: ${type}`);  // Debugging
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}

const initApp = () => {
    // get data from json
    fetch('products.json')
        .then(response => response.json())  // corrected '.then'
        .then(data => {
            listProducts = data;
            addDataToHTML();

            // get cart from memory
            if(localStorage.getItem('cart')){
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(error => console.error('Error fetching data:', error));  // optional error handling
};

initApp();


// timer javascript
// Set the date we're counting down to
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

