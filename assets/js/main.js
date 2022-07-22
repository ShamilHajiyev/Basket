let buttons = document.querySelectorAll('#addToCart');
let products;
const existingId = [];
let count = document.querySelector('#count');

if (JSON.parse(localStorage.getItem('products')) === null) {
    products = [];
}
else{
    products = JSON.parse(localStorage.getItem('products'));
    products.forEach(product => {
        existingId.push(product.Id);
    })
}

count.innerHTML = products.length;

buttons.forEach(btn => btn.addEventListener('click', function () {
    let id = Number(this.parentElement.parentElement.parentElement.id);
    if (existingId.length === 0 || !existingId.includes(id)) {
        let product = {
            Id: id,
            Img: this.parentElement.previousElementSibling.src,
            Name: this.parentElement.querySelector('.card-title').innerText,
            Price: this.parentElement.querySelector('#price').innerText,
            Count: 1
        }
        existingId.push(product.Id);
        products.push(product);
    }
    else {
        Find(id).Count++;
    }
    localStorage.setItem('products', JSON.stringify(products));
    count.innerHTML = products.length;
}))

function Find(id) {
    let foundProduct = null;
    products.forEach(product => {
        if (id === product.Id) {
            foundProduct = product;
        }
    });
    return foundProduct;
}
