import { menuArray } from "./menu.js"

const menuFeed = document.getElementById('menu-el')

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
                <button>
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="25" cy="25" r="24.25" stroke="#DEDEDE" stroke-width="1.5"/>
                        <path d="M25 12.5V37.5" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                        <path d="M12.5 25H37.5" stroke="#333" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        </div>
        `
    }).join('');
}

renderMenu()