'use strict';

let allProducts = [];
let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let clickAllowed = 25;

function Products(name, fileExtension = 'jpg'){
    this.name = name;
    this.src = `img/${name}.${fileExtension}`;
    this.views = 0;
    this.clicks = 0;
    allProducts.push(this);
}

function selectRandomProduct(){
    return Math.floor(Math.random() * allProducts.length);
}

function renderProducts(){
    // selectRandomProduct();
    let product1 = selectRandomProduct();
    let product2 = selectRandomProduct();
    let product3 = selectRandomProduct();
    while (product1 === product2){
        product2 = selectRandomProduct();
    }
    image1.src = allProducts[product1].src;
    image2.src = allProducts[product2].src;
    image3.src = allProducts[product3].src;
    image1.alt = allProducts[product1].name;
    image2.alt = allProducts[product2].name;
    image3.alt = allProducts[product3].name;
    allProducts[product1].views++;
    allProducts[product2].views++;
    allProducts[product3].views++;
}

function handleProductClick(event){
    if (event.target === myContainer){
        alert('Please click on an image');
    }

clicks++;
let productClick = event.target.alt;
for (let i = 0; i < allProducts.length; i++){
    if (productClick === allProducts[i].name){
        allProducts[i].clicks++;
        break;
    }
}

renderProducts();
if(clicks === clickAllowed){
    myButton.className = 'clicks-allowed';
    myContainer.removeEventListener('click', handleProductClick);
}
}

function renderResults(){
    let ul = document.querySelector('ul');
    for (let i = 0; i < allProducts.length; i++){
        let li = document.createElement('li')
        li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times`
        ul.appendChild(li);
    }
}

new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('sweep', 'png');
new Products('tauntaun');
new Products('unicorn');
new Products('water-can');
new Products('wine-glass');

renderProducts();

myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', renderResults);