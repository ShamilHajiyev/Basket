let tableBody = document.querySelector('#tbody');
let totalCountLabel = document.querySelector('#total-count');
let totalPriceLabel = document.querySelector('#total-price');

function Show() {
    let rows = '';
    let totalCount = 0;
    let totalPrice = 0;

    products.forEach(product => {
        rows += `
            <tr>
                <td id="id">${product.Id}</td>
                <td><img src="${product.Image}" alt="Product Image"></td>
                <td>${product.Title}</td>
                <td><input onchange="Change(event.target)" type="number" min="1" value="${product.Count}" style="width: 100%"></td>
                <td>${product.Price.toFixed(2)} AZN</td>
                <td>${(product.Price * product.Count).toFixed(2)} AZN</td>
                <td><button class="btn btn-danger" onclick="Delete(event.target)">Delete</button></td>
            </tr>
        `
        totalCount += product.Count;
        totalPrice += Number((product.Price * product.Count).toFixed(2));
    });
    
    totalCountLabel.innerHTML = totalCount;
    totalPriceLabel.innerHTML = totalPrice;
    tableBody.innerHTML = rows;
}

function Delete(e){
    let row = e.parentElement.parentElement;
    let foundId = Number(row.querySelector('#id').innerHTML);
    let found = FindProduct(foundId);
    let foundIndex = products.indexOf(found);

    products.splice(foundIndex, 1)
    ShowIndex();
    Show();
}

function Change(e) {
    let row = e.parentElement.parentElement;
    let productCount = e.value;
    if(productCount < Number(e.min)){
        productCount = 1;
    }

    products.forEach(product => {
        let productId = row.querySelector('#id');
        let foundId = FindProduct(Number(productId.innerHTML)).Id;
        if (foundId === product.Id) {
            product.Count = Number(productCount);
            ShowIndex();
        }
    });
    Show();
}

Show();