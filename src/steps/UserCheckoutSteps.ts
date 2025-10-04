import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

//Scenario Outline: full checkout flow
Given('user is logged in on store page', async function (this: CustomWorld) {
  await this.loginPage.login("standard_user", "secret_sauce"); 
  const isVisible = await this.loginPage.IsStorePageVisible(); 
  expect(isVisible).toBe(true);
});

When('the user add item to cart', async function (this: CustomWorld) {
  await this.storePage.clickAddToCartButton("backpack");
  await this.storePage.clickAddToCartButton("bike-light");
});

Then('user verify badge cart added', async function (this:CustomWorld) {
    const badgeCount = await this.storePage.getCartBadgeCount();
    expect(badgeCount).toBe(2);
});

Given('user on cart page', async function (this: CustomWorld) {
  await this.storePage.goToCart();
});

When('user click remove item from cart', async function (this: CustomWorld) {
  await this.storePage.clickRemoveButton("backpack");
});

Then('badge should decrease', async function (this: CustomWorld) {
    const badgeCount = await this.storePage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
});

Given('user continue checkout', async function (this: CustomWorld) {
  await this.storePage.checkout();
});

When('user input checkout information {string}, {string}, {string} and click checkout', async function (this: CustomWorld,firstname: string, lastname: string, postalcode: string) {
  await this.storePage.inputCheckoutInfo(firstname, lastname, postalcode);
});

Then('user finish checkout order', async function (this: CustomWorld) {
    await this.storePage.finishOrder();
});

Then('user see confirmation order', async function (this: CustomWorld) {
    await this.storePage.assertOrderConfirmation();
});

//Scenario Outline: failed checkout flow
When('missing checkout information and click checkout', async function (this: CustomWorld) {
  await this.storePage.inputCheckoutInfo("", "", "");
});

Then('user see error message {string}', async function (this: CustomWorld, errorMessage: string) {
    await this.storePage.assertCheckoutErrorMessage(errorMessage);
});