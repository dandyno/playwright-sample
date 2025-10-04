import { error } from "console";

export const StorePageObjects = {
    inventoryPage: '.inventory_list', 
    inventoryList: '#inventory_container', 
    inventoryItem: '.inventory_item',  
    inventoryItemAddToCartButton: (productName: string) => `[data-test="add-to-cart-sauce-labs-${productName}"]`,
    cartButton : '[class="shopping_cart_link"]',
    cartBadge : '[class="shopping_cart_badge"]',
    inventoryItemRemoveButton: (productName: string) => `[data-test="remove-sauce-labs-${productName}"]`,
    checkoutButton: '[id="checkout"]',
    firstNameInput: '[id="first-name"]',
    lastNameInput: '[id="last-name"]',
    postalCodeInput: '[id="postal-code"]',
    submitButton: '[id="continue"]',
    finishButton: '[id="finish"]',
    orderConfirmation: '[class="complete-header"]',
    menuButton: '[class="bm-burger-button"]',  
    logoutButton: '[id="logout_sidebar_link"]', 
    errorMessage: '[data-test="error"]'
};