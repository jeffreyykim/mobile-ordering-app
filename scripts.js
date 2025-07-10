import { menuArray } from "./menu.js"

const menuFeed = document.getElementById('menu-el')
const orderContainer = document.getElementById('order')
let order = []

function renderMenu() {
    menuFeed.innerHTML = menuArray.map(dish => {
        return `
        <div class="dish" id="${dish.name}">
            <div class="emoji">
                <p>${dish.emoji}</p>
             </div>
             <div class="right">
                <h3>${dish.name}</h3>
                <p class="ingredients">${dish.ingredients}</p> 
                <p class="price">$${dish.price}</p>
            </div>
            <div class="add-btn">
                <i class="btn" data-dish-id="${dish.id}">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="24.25" stroke="#DEDEDE" stroke-width="1.5"/>
                        <path d="M25 12.5V37.5" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                        <path d="M12.5 25H37.5" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </i>
            </div>
        </div>
        `
    }).join('');
}

function renderOrder() {
    if (order.length === 0) {
        orderContainer.innerHTML = `
            <div class="empty-order">
                <p>Your order will appear here</p>
            </div>
        `;
        return;
    }
    
    const orderHtml = order.map(item => {
        return `
        <div class="order-item">
            <span class="order-item-name">${item.name}</span>
            <span class="order-item-price">$${item.price}</span>
        </div>
        `
    }).join('');
    
    const totalPrice = order.reduce((total, item) => total + item.price, 0);
    
    orderContainer.innerHTML = `
        <div class="order-header">
            <h3>Your Order</h3>
        </div>
        <div class="order-items">
            ${orderHtml}
        </div>
        <div class="order-total">
            <strong>Total: $${totalPrice}</strong>
        </div>
        <button class="complete-order-btn">Complete Order</button>
    `;
}

// Event delegation - listen for clicks on the menu container
menuFeed.addEventListener('click', function(e) {
    if (e.target.closest('.btn')) {
        const dishId = parseInt(e.target.closest('.btn').dataset.dishId);
        const selectedDish = menuArray.find(dish => dish.id === dishId);
        
        if (selectedDish) {
            order.push(selectedDish);
            renderOrder();
        }
    }
});

renderMenu()
renderOrder()

