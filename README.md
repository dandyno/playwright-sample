## **Overview:**
This is a sample test automation framework developed using **Playwright** with **Cucumber** based on **Typescript**


## Features
- This testing framework supports Behavior Driven Development (BDD). Tests are written in plain English text called Gherkin
- HTML reports are included with screenshots in case of failed scenarios.

## Supported Browsers
1. Chrome


#### Steps to use
##### 1. Installation
Playwright framework requires [Node.js](https://nodejs.org/) v14+ to run.
Code from github need to be [cloned](https://github.com/dandyno/playwright-sample.git) using git command.
Installing the dependencies.
```sh
npm ci
```

##### 2. Test creation
- Test scenarios are organized into features and these feature files should be placed inside features folder.
- Step definitions connect Gherkin steps in feature files to programming code. A step definition carries out the action that should be performed by the scenario steps. These step definitions should placed inside steps folder in different packages.
- For web UI based tests maintain all the selectors inside pages folder.

##### 3. Execution
To run all test scenarios use below command.
```sh
npm run test
```
To run specific scenario, use tags command. Below are few examples.
```sh
npm run test:tags -- '@user_authencation'
npm run test:tags -- '@user_checkout'
```

##### 4. Report & Logs
HTML report will be present inside
```sh
reports/html/index.html
```
Screenshots will be present inside in case of failures
```sh
reports/screenshots/
```