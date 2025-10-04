import { BeforeAll, AfterAll, Before, After, setDefaultTimeout, Status} from '@cucumber/cucumber';
import { chromium, Browser } from 'playwright';
import LoginPage from '../src/pages/LoginPage';
import StorePage from '../src/pages/StorePage';
import { CustomWorld } from '../src/world';
import path from 'path';
import { ensureDir } from 'fs-extra';
    
setDefaultTimeout(60 * 1000);
let sharedBrowser: Browser | null = null;

Before(async function (this: CustomWorld) {
  if (!sharedBrowser) {
    sharedBrowser = await chromium.launch({ headless: false });
  }
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  this.browser = browser;
  this.page = page;
  this.loginPage = new LoginPage(page);
  this.storePage = new StorePage(page);

  await this.loginPage.open();
});

After(async function (this: CustomWorld, scenario) {
 if (scenario.result?.status === Status.FAILED && this.page) {
    const shotsDir = path.join(process.cwd(), 'reports', 'screenshots');
    await ensureDir(shotsDir);

    const fileSafe = scenario.pickle.name.replace(/[^\w\d-_]+/g, '_');
    const shotPath = path.join(shotsDir, `${fileSafe}.png`);

    const buffer = await this.page.screenshot({ path: shotPath, fullPage: true });
    await this.attach(buffer, 'image/png'); 
    await this.attach(`Screenshot saved: ${shotPath}`, 'text/plain');
  }

  try { await this.page?.context()?.close(); } catch {}
});

process.on('beforeExit', async () => {
  try { await sharedBrowser?.close(); } catch {}
});

AfterAll(async function (this: CustomWorld) {
  if (this.browser) {
    await this.browser.close();
  }
});

