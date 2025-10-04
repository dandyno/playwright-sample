import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../world';

Given('user navigate to login page', async function (this: CustomWorld) {
  await this.loginPage.open(); 
});

When('the user enters credentials {string}, {string} and click login', async function (this: CustomWorld, username: string, password: string) {
  await this.loginPage.login(username, password); 
});

Then('user should see store page', async function (this: CustomWorld) {
    const isVisible = await this.loginPage.IsStorePageVisible(); 
    expect(isVisible).toBe(true);
});

Given('user on store page', async function (this: CustomWorld) {
  const isVisible = await this.loginPage.IsStorePageVisible();
  expect(isVisible).toBe(true); 
});

When('the user click sidemenu and logout', async function (this: CustomWorld) {
  await this.storePage.logout(); 
});

Then('user will log out and see login page', async function (this: CustomWorld) {
  const isLoginPageVisible = await this.loginPage.IsLoginPageVisible(); 
  expect(isLoginPageVisible).toBe(true); 
});

Then('user should see error msg', async function (this: CustomWorld) {
    const isErrorVisible = await this.loginPage.assertErrorMessageVisible();
    expect(isErrorVisible).toBe(true);
});


