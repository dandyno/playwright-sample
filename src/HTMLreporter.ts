import { generate } from 'multiple-cucumber-html-reporter';
import fs from 'fs';
import path from 'path';

const jsonDir = path.join(process.cwd(), 'reports');
const jsonFile = path.join(jsonDir, 'cucumber.json');
const reportPath = path.join(jsonDir, 'html');

if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir, { recursive: true });
if (!fs.existsSync(reportPath)) fs.mkdirSync(reportPath, { recursive: true });

if (!fs.existsSync(jsonFile)) {
  console.error(`❌ Could not find ${jsonFile}. Did Cucumber run and produce JSON?`);
  process.exit(1);
}
const stats = fs.statSync(jsonFile);
if (stats.size === 0) {
  console.error(`❌ ${jsonFile} is empty. Check your Cucumber run/format settings.`);
  process.exit(1);
}

generate({
  jsonDir,         
  reportPath,              
  openReportInBrowser: false,
  pageTitle: 'Cucumber Report',
  reportName: 'Playwright + Cucumber (TS)',
  displayDuration: true,
  hideMetadata: false,
  metadata: {
    browser: {
      name: 'chromium',
      version: 'Playwright-managed'
    },
    device: 'Local machine',
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: 'Run info',
    data: [
      { label: 'Project', value: 'Playwright Sample' },
      { label: 'Execution Start', value: new Date().toLocaleString() }
    ]
  }
});

console.log(`✅ HTML report generated at: ${path.join(reportPath, 'index.html')}`);
