let tempProduct = {}; // Temporary object to store product details

function addToCart(productName,productPrice,productImg){
    console.log("First function is worked");
    tempProduct = {
        name: productName,
        price: productPrice,
        image: productImg
    };

    // Show the confirmation popup
    document.getElementById('box').classList.add('d-block');
    document.getElementById('box').classList.remove('d-none');
}

function add(){
    console.log("Second function is worked");    
    
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // parse = change to string
    let existingProduct = cart.find(item => item.name ===  tempProduct.name);

    if(existingProduct){
        existingProduct.quantity +=1;
    }else{
        let product  = { 
            id: cart.length +1,
            name: tempProduct.name,
            price: tempProduct.price,
            quantity: 1,
            image: tempProduct.image 
        }
        cart.push(product);
    }
    console.log(cart);
    
    localStorage.setItem('cart',JSON.stringify(cart));
    tempProduct = {};

    cancel();
}
function cancel() {
    document.getElementById('box').classList.remove('d-block');
    document.getElementById('box').classList.add('d-none');
}

//Basket Function

function clearAll(){
    localStorage.removeItem('cart');
    loadData();
    let price = document.querySelector('#total');
    price.textContent = 0;
}
function loadData(){
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.querySelector('.carts');
    // console.log(cart);

    let total = 0;
    cartItems.innerHTML = '';

    if(cart.length === 0){
        cartItems.innerHTML = `<h4 class="text-center my-4"> Your Shopping cart is empty </h4>`;
    }
    else{
        cart.forEach((item,index)=>{
            cartItems.innerHTML += `
                <div class="cart d-flex justify-content-between">
                    <img src="imgs/${item.image}" alt="" style="width: 100px; ">
                    <div class="info text-end">
                        <h4 class="m-0">${item.name}</h4>
                        <p class="m-0 fs-4">Price: $ ${item.price}</p>
                        <div class="btns">
                            <button onclick="changeQuantity(${index}, 'decrease')" class="btn mx-2 fs-4">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="changeQuantity(${index}, 'increase')" class="btn mx-2 fs-4">+</button>
                        </div>
                    </div>
                </div> <hr>
            `;

            total += item.price * item.quantity;
            let price = document.querySelector('#total');
            price.textContent = total;
        });
            
    }
    
}

// quantity increase and decrease
function changeQuantity(index, action){
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(action == 'increase'){
        cart[index].quantity += 1;
    } else if(action == "decrease"){ 
        cart[index].quantity -= 1;
    } 
    if(cart[index].quantity == 0){        
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadData()  // to load or refresh the product cart
}


