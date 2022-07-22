let buttons = document.querySelectorAll('#addToCart');
let products;
const existingId = [];
let count = document.querySelector('#count');

function CreateProducts() {
    if (JSON.parse(localStorage.getItem('products')) === null) {
        products = [];
    }
    else{
        products = JSON.parse(localStorage.getItem('products'));
        products.forEach(product => {
            existingId.push(product.Id);
        })
    }
}

function ShowIndex() {
    count.innerHTML = products.length;
    localStorage.setItem('products', JSON.stringify(products));
}

function FindProduct(productId) {
    let foundProduct = null;
    products.forEach(product => {
        if (productId === product.Id) {
            foundProduct = product;
        }
    });
    return foundProduct;
}


buttons.forEach(btn => btn.addEventListener('click', function () {
    let productCard = this.parentElement.parentElement.parentElement;
    let productId = Number(productCard.id);
    if (existingId.length === 0 || !existingId.includes(productId)) {
        let product = {
            Id: productId,
            Image: productCard.querySelector('img').src,
            Title: productCard.querySelector('#product-title').innerText,
            Price: Number(productCard.querySelector('#product-price').innerText),
            Count: 1
        }
        existingId.push(product.Id);
        products.push(product);
    }
    else {
        FindProduct(productId).Count++;
    }
    ShowIndex();
}))

CreateProducts();
ShowIndex();