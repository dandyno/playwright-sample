import { LoginPageObject } from '../objects/LoginPageObjects';
import { Page } from 'playwright';

export default class LoginPage {    
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async open() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string) {
        await this.page.fill(LoginPageObject.usernameField, username);
        await this.page.fill(LoginPageObject.passwordField, password);
        await this.page.click(LoginPageObject.loginButton);
    }

    async IsStorePageVisible() {
        await this.page.waitForSelector(LoginPageObject.inventoryList);
        return await this.page.isVisible(LoginPageObject.inventoryList);
    }

    async IsLoginPageVisible() {
        try {
            await this.page.waitForSelector(LoginPageObject.usernameField);  // Wait for username field
            return await this.page.isVisible(LoginPageObject.usernameField);  // Check if the username field is visible
        } catch (error) {
            console.log("Error in IsLoginPageVisible:", error);
            return false;  // Return false if not visible
        }
    }

    async assertErrorMessageVisible() {
        const isErrorVisible = await this.page.isVisible(LoginPageObject.errorMessageContainer);
        return isErrorVisible;
    }

}