let tableBody = document.querySelector('#tbody');
let totalCountSpan = document.querySelector('#total-count');
let totalPriceSpan = document.querySelector('#total-price');

function Change(e) {
    if(e.target.value > Number(document.querySelector('#product-count').max)){
        e.target.value = 100;
    }
    if(e.target.value < Number(document.querySelector('#product-count').min)){
        e.target.value = 1;
    }
    products.forEach(product => {
        if (Find(Number(e.target.parentElement.parentElement.querySelector('#id').innerHTML)).Id === product.Id) {
            product.Count = Number(e.target.value);
            localStorage.setItem('products', JSON.stringify(products));
        }
    });
    Show();
}


function Show() {
    let text = '';
    let totalCount = 0;
    let totalPrice = 0;
    products.forEach(product => {
        text += `
        <tr>
            <td id="id">${product.Id}</td>
            <td><img src="${product.Img}" alt=""></td>
            <td>${product.Name}</td>
            <td><input id="product-count" oninput="Change(event)" type="number" min="1" max="100" value="${product.Count}" style="width: 100%"></td>
            <td>${Number(product.Price).toFixed(2)}</td>
            <td>${(product.Price * product.Count).toFixed(2)}</td>
            <td><button class="btn btn-danger" onclick="Delete(event)">Delete</button></td>
        </tr>
        `
        totalCount += product.Count;
        totalPrice += Number((product.Price * product.Count).toFixed(2));
    });
    totalCountSpan.innerHTML = totalCount;
    totalPriceSpan.innerHTML = totalPrice;
    tableBody.innerHTML = text;
}

Show();

function Delete(e){
    let found = Find(Number(e.target.parentElement.parentElement.querySelector('#id').innerHTML));
    products.splice(products.indexOf(found), 1)
    localStorage.setItem('products', JSON.stringify(products));
    count.innerHTML = products.length;
    Show();
}