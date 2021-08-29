'use strict';
// ---------- Global variables ------------- //
let allProducts = [];
// console.log(allProducts);
let myContainer = document.querySelector('section');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let clickAllowed = 25;
let numberOfDifferentStuff = 4;
// ---------- Constructor function ------------- //
function Products(name, fileExtension = 'jpg'){
    this.name = name;
    this.src = `img/${name}.${fileExtension}`;
    this.views = 0;
    this.clicks = 0;
    allProducts.push(this);
}
// ---------- Global functions ------------- //
function selectRandomProduct(){
    return Math.floor(Math.random() * allProducts.length);
}

let productArray = [];
function renderProducts(){
    // selectRandomProduct();
    while (productArray.length < numberOfDifferentStuff){
        let randomNumber = selectRandomProduct();
        if (!productArray.includes(randomNumber)){
            productArray.push(randomNumber);
        }
    }
    let product1 = productArray.shift();
    let product2 = productArray.shift();
    let product3 = productArray.shift();
    
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
// ---------- Event Handler ------------- //
function handleProductClick(event){
    event.preventDefault();
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
    
    myContainer.removeEventListener('click', handleProductClick);
    renderChart();
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
function renderChart(){
let productName = [];
let productViews = [];
let productClicks = [];
for (let i = 0; i < allProducts.length; i++){
productName.push(allProducts[i].name);
productViews.push(allProducts[i].views);
productClicks.push(allProducts[i].clicks);
}
let chartObject =  {
    type: 'bar',
    data: {
        labels: productName,
        datasets: [{
            label: '# of views',
            data: productViews,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor:  'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: '# of Clicks',
            data: productClicks,
            backgroundColor:'rgba(54, 162, 235, 0.2)',
             borderColor:'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }
    ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}

function storeAProduct(){
    console.log(allProducts);
    let stringifiedProducts = JSON.stringify(allProducts);
    console.log(stringifiedProducts);
    localStorage.setItem('products',stringifiedProducts);
}
// reinstanciation
function getProducts(){
    let potentialThings = localStorage.getItem('products');
    console.log(potentialThings);
    if (potentialThings){
        let parsedProducts = JSON.parse(potentialThings);
        console.log(parsedProducts);
        for (let products of parsedProducts){
            let name = products.name;
            let src =  products.src;
            let views = products.views;
            let clicks = products.clicks;
            new Products(name, src, views,clicks);
        }
    }
}
// getProducts();
storeAProduct();
getProducts();
let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, chartObject);
}
// ---------- Event listener ------------- //
myContainer.addEventListener('click', handleProductClick);
