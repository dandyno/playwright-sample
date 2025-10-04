import { expect } from '@playwright/test';
import { StorePageObjects } from '../objects/StorePageObjects';
import { Page } from 'playwright';

export default class LoginPage {    
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async logout() {
        await this.page.click(StorePageObjects.menuButton); 
        await this.page.click(StorePageObjects.logoutButton);  
    }

    async clickAddToCartButton(itemName: string) {
        const button = await this.page.locator(StorePageObjects.inventoryItemAddToCartButton(itemName));
        const isVisible = await button.isVisible();
        if (isVisible) {
            await button.scrollIntoViewIfNeeded();
            await button.click();
        } else {
            throw new Error(`Add to Cart button for ${itemName} is not visible.`);
        }
    }

    async goToCart() {
        await this.page.click(StorePageObjects.cartButton); 
        await expect(this.page).toHaveURL(/.*cart.html/);
        return this;
    }

    async getCartBadgeCount(): Promise<number> {
        const badge = this.page.locator(StorePageObjects.cartBadge);
        if (await badge.isVisible()) {
            const text = await badge.textContent();
            return text ? parseInt(text) : 0;
        }
    }

    async clickRemoveButton(itemName: string) {
        const button = await this.page.locator(StorePageObjects.inventoryItemRemoveButton(itemName));
        const isVisible = await button.isVisible();
        if (isVisible) {
            await button.scrollIntoViewIfNeeded();
            await button.click();
        } else {
            throw new Error(`Add to Cart button for ${itemName} is not visible.`);
        }
    }

    async checkout() {
        await this.page.click(StorePageObjects.checkoutButton); 
        return this;
    }

    async inputCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(StorePageObjects.firstNameInput, firstName); 
        await this.page.fill(StorePageObjects.lastNameInput, lastName); 
        await this.page.fill(StorePageObjects.postalCodeInput, postalCode); 
        await this.page.click(StorePageObjects.submitButton);
    }

    async finishOrder() {
        await this.page.click(StorePageObjects.finishButton); 
    }

    async assertOrderConfirmation() {
        await this.page.waitForSelector(StorePageObjects.orderConfirmation);
        const confirmationText = await this.page.textContent(StorePageObjects.orderConfirmation);
        expect(confirmationText).toContain('Thank you for your order!');
    }   

    async assertCheckoutErrorMessage(expectedMessage: string) {
        const errorMessage = await this.page.textContent(StorePageObjects.errorMessage);
        expect(errorMessage).toBe(expectedMessage);
    }

}