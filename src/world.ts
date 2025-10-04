import { Browser, Page } from 'playwright';
import LoginPage from '../src/pages/LoginPage';
import StorePage from '../src/pages/StorePage';
import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  browser!: Browser;
  page!: Page;
  loginPage!: LoginPage;
  storePage!: StorePage;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);