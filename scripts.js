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

function showCardDetails() {
    const totalPrice = order.reduce((total, item) => total + item.price, 0);
    
    const modalHtml = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Enter Card Details</h2>
                    <button class="close-btn">×</button>
                </div>
                <form class="card-form">
                    <div class="form-group">
                        <label for="card-name">Name on Card</label>
                        <input type="text" id="card-name" placeholder="Enter your name" required>
                    </div>
                    <div class="form-group">
                        <label for="card-number">Card Number</label>
                        <input type="text" id="card-number" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiry">Expiry Date</label>
                            <input type="text" id="expiry" placeholder="MM/YY" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="123" required>
                        </div>
                    </div>
                    <div class="form-total">
                        <strong>Total: $${totalPrice}</strong>
                    </div>
                    <button type="submit" class="pay-btn">Pay Now</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    // Add event listeners to the modal
    const modal = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const form = document.querySelector('.card-form');
    
    // Close modal when clicking overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeCardDetails();
        }
    });
    
    // Close modal when clicking close button
    closeBtn.addEventListener('click', closeCardDetails);
    
    // Handle form submission
    form.addEventListener('submit', processPayment);
}

function closeCardDetails() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function processPayment(event) {
    event.preventDefault();
    const name = document.getElementById('card-name').value;
    
    if (name.trim() === '') {
        alert('Please enter your name');
        return;
    }
    
    // Show thank you message in the order container
    orderContainer.innerHTML = `
        <div class="thank-you-message">
            <h2>Thanks ${name}!</h2>
            <p>Your order is on its way!</p>
        </div>
    `;
    
    // Reset order and close modal
    order = [];
    closeCardDetails();
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

// Event delegation - listen for clicks on the order container
orderContainer.addEventListener('click', function(e) {
    if (e.target.classList.contains('complete-order-btn')) {
        showCardDetails();
    }
});

renderMenu()
renderOrder()

